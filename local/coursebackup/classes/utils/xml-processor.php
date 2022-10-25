<?php
/**
 * @package coursebackup
 * @subpackage xml-helper
 * @copyright 2022 FHI
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once($CFG->dirroot.'/backup/util/xml/parser/processors/grouped_parser_processor.class.php');


class moodlexml_parser_processor extends grouped_parser_processor {

    protected $accumchunks;

    public function __construct($nodeElements) {
        $this->accumchunks = array();
        parent::__construct();
        // Let's add all the paths we are interested on
        for ($i=0; $i < count($nodeElements); $i++) {
            $node = $nodeElements[$i];
            if($i == 0)
                $this->add_path($node, true);
            else
                $this->add_path($node);
        }
        
    }

    protected function dispatch_chunk($data) {
        $this->accumchunks[] = $data;
    }

    protected function notify_path_start($path) {
        // nothing to do
      

    }

    protected function notify_path_end($path) {
        // nothing to do
    }

    public function get_all_chunks() {
        return $this->accumchunks;
    }

}
