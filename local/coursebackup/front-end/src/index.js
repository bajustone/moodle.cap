import {LitElement, css, svg, html} from 'lit';
import { doneIcon, loadingIcon } from './icons.js';
import LoadingElt from "./loading.js";
// import ForumSync from './forum-sync.js';
import {remoteAPIUrl, CAP_BASE_URL} from "./cap-data.json";

const PLUGIN_BASE_URL = `${CAP_BASE_URL}/local/coursebackup`;

const COURSES_ENDPOINT = `${PLUGIN_BASE_URL}/get-remote-courses.php`;
const COURSE_DOWNLOAD_ENDPOINT = `${PLUGIN_BASE_URL}/download-remote-course.php?course_id=`;
const DELETE_ALL_COURSES_ENDPOINT = `${PLUGIN_BASE_URL}/delete-courses.php`;
const SYNC_GRADES_ENDPOINT = `${PLUGIN_BASE_URL}/sync-to-online.php?course_id=`;
const SYNC_PAGE_LINK = `${PLUGIN_BASE_URL}/manage.php`;
const IS_USER_ADMIN_LINK = `${PLUGIN_BASE_URL}/get-current-user.php`;
const COURSE_FEEDBACK_LINK = `${PLUGIN_BASE_URL}/course-feedback.php`;
const COURSE_FEEDBACK_SYNC_LINK = `/local/coursebackup/sync-course-feedback.php`;


const _isAdmin = async () => {
  const res = await (await (fetch(IS_USER_ADMIN_LINK))).json();
  if(res.isAdmin) return true;
  return false;
}

export class App extends LitElement{
    static styles = css`
    :host {
      display: block;
      height: calc(100vh - 420px);
      position: relative;
      overflow: auto
    }
    table{
      border-collapse: collapse;
      width: 100%;
      max-width: 700px;
      margin: auto;
    }
    table td, table th{
      border: 1px solid rgba(0, 0, 0, 0.125);
      padding: 8px;
      min-width: 24px;
    }
    .loading{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .table-header{
      display: flex;
      width: 100%;
      max-width: 700px;
      margin: auto;
      padding: 8px 0px 24px 0px;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .table-header button{
      height: 42px;
      background-color: #0f6fc5;
      border: 1px solid  #0f6fc5;
      color: #fff;
      cursor: pointer;
    }
    .table-header h1{
      font-size: 20px;
      
    }
    .index-column{
      position: relative;
    }
    .downloading, .download-complete{
      opacity: 0;
      position: absolute;
      left: -40px;


    }
    .tr-downloading{
      background: rgba(0, 0, 0, 0.1);
    }
    .downloading div{
      width: 18px;
      height: 18px
    }
    .downloading.visible, .download-complete.visible{
      opacity: 1;
    }

    /* Spinner Circle Rotation */
.sp-circle {
  border: 4px rgba(0, 0, 0, 0.25) solid;
  border-top: 4px black solid;
  border-radius: 50%;
  -webkit-animation: spCircRot 0.6s infinite linear;
  animation: spCircRot 0.6s infinite linear;
}

@-webkit-keyframes spCircRot {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
}
@keyframes spCircRot {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
  `;
  static properties = {
    _courses: {state: true}
  };
  static properties = {
    _loading: {state: true}
  };
  

  constructor(){
    super();
    this.getCourses();
    this._courses = {};
    this.loading = true;
    this.isAdmin = false;
    this.online = navigator.onLine;
    this.currentCourse;
    this.selectdCourses = new Map(); 
  }
  _offline(){
    this.online = false;
    this.requestUpdate();
  }
  _online(){
    this.online = true;
    this.requestUpdate();
  }
  async getCourses(){
   try {
    const request = await fetch(COURSES_ENDPOINT);
    const result = await request.json();
    if(result.success === false){
      this.loading = false;
      this.online = false;
      this.requestUpdate();
    return;

    }
    this._courses = result;
    this.loading = false;
    this.requestUpdate();
   } catch (error) {
    this.loading = false;
    this.online = false;
    this.requestUpdate();
   }
  }
  connectedCallback(){
    super.connectedCallback();
    _isAdmin().then(isAdmin=>{
      if (!isAdmin) return;
      this.isAdmin = true;
      this.requestUpdate();
    });
    // const syncObj = new ForumSync();
    // syncObj.syncCourseForums(4).then(a=>{
    //   console.log("Done");
    //   console.log(a);
    // }).catch(err=>{
    //   console.error("Failed");
    //   console.warn(err);
    // })
    window.addEventListener("offline", ()=>this._offline());
    window.addEventListener("online", ()=>this._online());
    const pageContentElt = document.querySelector("#page-content");
    const rect = pageContentElt?.getBoundingClientRect();
    if(rect)
      this.style.height = `${rect.height - 62}px`;
  }
  offlineView(){
    return  html`<div class="loading">
    ${svg`<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m40.9 45.2-5.75-5.75H12.4Q8 39.45 5 36.5t-3-7.35q0-4 2.525-6.7t6.325-3.3q.1-.7.325-1.575T11.8 16L3.5 7.7l2.1-2.1 37.45 37.45Zm-28.5-8.75h19.85l-18-18q-.55.75-.725 1.7-.175.95-.175 1.85h-.95q-3.1 0-5.25 1.975T5 29q0 3.1 2.15 5.275Q9.3 36.45 12.4 36.45Zm10.8-9.05Zm19.5 10.5-2.35-2.35q1.25-.85 1.95-1.9.7-1.05.7-2.5 0-2.15-1.55-3.675t-3.7-1.525H34.4V21.9q0-4.4-3.05-7.375-3.05-2.975-7.45-2.975-1.4 0-3.025.45T17.9 13.45l-2.1-2.1q1.8-1.45 3.875-2.125T23.9 8.55q5.55 0 9.525 3.95Q37.4 16.45 37.4 22v1.05Q41 23 43.5 25.3q2.5 2.3 2.5 5.85 0 1.75-.825 3.675Q44.35 36.75 42.7 37.9ZM29.15 24.5Z"/></svg>`}
  </div>`;
  }
    render(){
      
        return !this.isAdmin ? html`<div>Unauthorized</div>` : !this.online ? this.offlineView () : this.loading ? html`
        <div class="loading">
          ${svg`<svg width="64px" height="64px" viewBox="0 0 128 128"><rect x="0" y="0" width="100%" height="100%" fill="#fff"></rect><path fill="#1a237e" id="ball1" class="cls-1" d="M67.712,108.82a10.121,10.121,0,1,1-1.26,14.258A10.121,10.121,0,0,1,67.712,108.82Z"><animateTransform attributeName="transform" type="rotate" values="0 64 64;4 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;" dur="1000ms" repeatCount="indefinite"></animateTransform></path><path fill="#1a237e" id="ball2" class="cls-1" d="M51.864,106.715a10.125,10.125,0,1,1-8.031,11.855A10.125,10.125,0,0,1,51.864,106.715Z"><animateTransform attributeName="transform" type="rotate" values="0 64 64;10 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;" dur="1000ms" repeatCount="indefinite"></animateTransform></path><path fill="#1a237e" id="ball3" class="cls-1" d="M33.649,97.646a10.121,10.121,0,1,1-11.872,8A10.121,10.121,0,0,1,33.649,97.646Z"><animateTransform attributeName="transform" type="rotate" values="0 64 64;20 64 64;40 64 64;65 64 64;85 64 64;100 64 64;120 64 64;140 64 64;160 64 64;185 64 64;215 64 64;255 64 64;300 64 64;" dur="1000ms" repeatCount="indefinite"></animateTransform></path></svg>`}
        </div>

        ` 
        : html`
        <div class="table-header">
          <h1>List of available courses</h1>
          <button @click=${_=>this._downloadCourses()}>Download</button>
          <button @click=${_=>this._uploadAllCoursesUsersData()}>Upload</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <!-- <th>Course Id</th> -->
              <th>Course name</th>
              <th>Description</th>
              <th><input type=checkbox disabled/> </th>
            </tr>
          </thead>
          <tbody>
            ${Object.values(this._courses).map((course, index)=>{
              const descriptionElt = document.createElement('span');
              descriptionElt.innerHTML = course.summary;
              if(course.id == 1) return;
              return html`<tr class=${`${!!course.downloading ? "tr-downloading" : ""}`}>
                <td class="index-column">
                  <span class=${`downloading ${!!course.downloading ? "visible" : ""}`}>
                    <div class="sp sp-circle"></div>
                  </span>
                  <span class=${`download-complete ${!!course.downloadComplete ? "visible" : ""}`}>${doneIcon}</span>
                  ${index}
                </td>
                <!-- <td>${course.id}</td> -->
                <td>${course.fullname}</td>
                <td>${descriptionElt}</td>
                <td><input @change=${evt=>this._courseSelectionChanged(evt, course)} .checked=${this.selectdCourses.has(course.id) }
                 type="checkbox" /></td>
              </tr>`;
            })}
          </tbody>
        </table>
        `;
    }
    _courseSelectionChanged(evt, course){
      const selected = evt.target.checked;
      if(selected){
        this.selectdCourses.set(`${course.id}`, course);
        return;
      }
      if(!this.selectdCourses.has(`${course.id}`)) return;
      this.selectdCourses.delete(`${course.id}`);
      
    }
    async deleteAllCourses(courseId){
      const url = `${DELETE_ALL_COURSES_ENDPOINT}?course_id=${courseId}`;
     
      const response = await fetch(url);
      const res = await response.json();
      console.log("Delete existing course", res);
    }

    async _downloadCourses(){
      this.downloading = true;
      this.requestUpdate();
      await this._uploadAllCoursesUsersData();
      // this.loading = false;
      this.requestUpdate();
     
     for (const course of this.selectdCourses.values()) {
       if(course.id == 1) continue;
      
       await this.deleteAllCourses(course.id);
      //  course.downloading = true;
       this._courses[course.id] = course;
       this.requestUpdate();
       const res = await this._downloadCourse(course.id);
       course.downloading = false;
       course.downloadComplete = true;
       this._courses[course.id] = course;
       console.log("dowload completed: ", res);
       this.requestUpdate();

     }
    }
    async _downloadCourse(courseId){
      const request = await fetch(`${COURSE_DOWNLOAD_ENDPOINT}${courseId}`);
      if(!request.ok){
        const message = `${request.status}: ${request.statusText}`;
        console.error(message);
        return {message}
      }
      const resultString = await request.text();
      return JSON.parse(resultString).success; 
    }
    async _uploadUserData(courseId){

      const url = `${SYNC_GRADES_ENDPOINT}${courseId}`;
     


      try {
        const request = await fetch(url);
        // console.log("request: ", request);s
        const coursefeedbackResponse = await fetch(`${COURSE_FEEDBACK_LINK}?course_id=${courseId}`);
        
        const coursefeedback = await coursefeedbackResponse.json();
        const coursefeedbackSyncResponse = await fetch(`${remoteAPIUrl}${COURSE_FEEDBACK_SYNC_LINK}`, {
          method: "post",
          body: JSON.stringify(coursefeedback)
        });
        const coursefeedbackSync = await coursefeedbackSyncResponse.json();
        console.log(coursefeedbackSync); 
  
        
        const json = await request.json();

        console.log(json);
        return json;
      } catch (error) {
        console.error( error);
      }

      
    }
    async _uploadAllCoursesUsersData(){
      for (const course of this.selectdCourses.values()) {
        
        if(course.id == 1) continue;
        course.downloading = true;
        this._courses[course.id] = course;
        this.requestUpdate();
        const res = await this._uploadUserData(course.id);
        course.downloading = false;
        course.downloadComplete = true;
        this._courses[course.id] = course;
        this.requestUpdate();
 
      }
    }     
}

customElements.define("main-section", App);
customElements.define("f-loading", LoadingElt);


(async ()=>{
  const isAdmin = await _isAdmin();
  if(isAdmin) return;
  // const currentUrl = document.location.origin;
  const url = `${CAP_BASE_URL}${SYNC_PAGE_LINK}`;
  const syncLink = document.querySelector(`a[href="${url}"]`);
  if(!syncLink){
    console.error("Sync page link not found");
    return;
  }
  const listItemElement= syncLink.parentElement;
  listItemElement.parentElement.removeChild(listItemElement);
})();