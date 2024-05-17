import React from "react";

const Test = () => {
  return (
    <div>

        Prueba de Testing
        <div class="col-12">
         <input type="submit" value="Save" class="btn btn-success float-left"/>
      </div>
      <div class="col-12">
      <a href="#" class="btn btn-secondary mx-auto" style="margin:auto">Cancel</a>
      </div>
      <div class="col-12">
      <input type="submit" value="Commit" class="btn btn-success float-right"/>
      </div>
    </div>
  );
};

export default Test;
