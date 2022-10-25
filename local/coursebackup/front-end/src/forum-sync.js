import {remoteAPIUrl, remoteToken, capToken} from "./cap-data.json";
const SERVER_API_URL = "/webservice/rest/server.php";
export default class ForumSync{
    _baseURL = "";
    _server_api_url = "";
    _base_fetc_options = {
        wstoken: capToken,
        moodlewsrestformat: "json",
        wsfunction: "mod_forum_get_forums_by_courses"
    };
    _remote_api_url = "http://197.243.24.148"
    constructor(){
        this._baseURL = window.location.origin;
        this._server_api_url = `${this._baseURL}${SERVER_API_URL}`;
        this._remote_server_api_url = `${remoteAPIUrl}${SERVER_API_URL}`;
       
    }
    async syncCourseForums(courseid){
        const forumTasks = [];
        const fourms  = await this._getForums([courseid]);
        fourms.forEach(forum => {
            forumTasks.push(this.syncForum(forum.id))
        }); 
        return Promise.all(forumTasks);
    }
    async syncForum(forumid){
        const postsPromises = [];
        const postSyncPromise = [];
        const discussions = await this._getForumDiscussions([forumid]);
        discussions.forEach(discussion=>{
            postsPromises.push(this._getdiscussionPosts(discussion.id));
        });
        
        const discussionsPosts = await Promise.all(postsPromises);
        const discussionMap = new Map();
        discussionsPosts.forEach(discussionPosts=>{

            discussionPosts.forEach(post=>{
                // if(!post.parentid){
                //     discussionMap.set(`${post.discussionid}`, );
                    
                //     postSyncPromise.push(this._createDiscussion(post));
                //     return;
                // }
                // postSyncPromise.push(this._syncPost(post, ));
                postSyncPromise.push(this._createDiscussion(post, 8));
                
                
            })
        })
        return Promise.all(postSyncPromise);
    }
    async _createDiscussion(post, forumid){
        const paramsObj = {
            ...this._base_fetc_options,
            wstoken: remoteToken,
            wsfunction: "mod_forum_add_discussion",
            forumid,
            subject: post.subject,
            message: post.message
        }
        const params = new URLSearchParams({...paramsObj});
        const apiEndpoint = `${this._remote_server_api_url}?${params.toString()}`;
        // const s = await this._getForums([4], true);
        
        // console.log("remote: ", s);
        // const apiEndpoint = `${this._server_api_url}?${params.toString()}`;
        const json = await this._fetchAPI(apiEndpoint)
        return Promise.resolve(json);

    }
    async _syncPost(post, postid){
        const paramsObj = {
            ...this._base_fetc_options,
            // wstoken: remoteToken,
            wsfunction: "mod_forum_add_discussion_post",
            postid,
            subject: post.subject,
            message: post.message
        }
        const params = new URLSearchParams({...paramsObj});
        const apiEndpoint = `${this._remote_server_api_url}?${params.toString()}`;
        // const apiEndpoint = `${this._server_api_url}?${params.toString()}`;
        const json = await this._fetchAPI(apiEndpoint)
        return Promise.resolve(json);
    }
    async _getForums(courseids, remote = false){
        const getCourersParams = this._getCoursesParams(courseids);
        const remoteOptions = remote ? {
            wstoken: remoteToken
        }:  {};
        const params = new URLSearchParams({...this._base_fetc_options, ...remoteOptions});
        const searchParams = `${params.toString()}&${getCourersParams}`;
        const apiEndpoint =  !remote ? `${this._server_api_url}?${searchParams}`: `${this._remote_server_api_url}?${searchParams}`;
        const json = await this._fetchAPI(apiEndpoint);
        return json;

    }
    async _getdiscussionPosts(discussionid){
        const params = new URLSearchParams({
            ...this._base_fetc_options, 
            wsfunction: "mod_forum_get_discussion_posts",
            sortdirection: "ASC",
            discussionid

        });
        const apiEndpoint = `${this._server_api_url}?${params.toString()}`;
        const json = await this._fetchAPI(apiEndpoint);
       
        return json.posts ?? [];
    }
    async _fetchAPI(url){
        const res = await fetch(url);
        return res.json();
    }
    async _getForumDiscussions(forumid){
        const params = new URLSearchParams({
            ...this._base_fetc_options, 
            wsfunction: "mod_forum_get_forum_discussions",
            forumid
        });
        const apiEndpoint = `${this._server_api_url}?${params.toString()}`;
        const json = await this._fetchAPI(apiEndpoint);
       
        return json.discussions ?? [];
    }
    /**
     * 
     * @param {string[]} courseids 
     * @returns {string}
     */
    _getCoursesParams(courseids){
        let res = [];
        const prefix = "courseids";

        courseids.forEach((id, i)=>{
            res.push(`${prefix}[${i}]=${id}`);
        });
        

        return res.join("&");
    }
}