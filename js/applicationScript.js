/*
 * Copyright (c) 2015 Advanced Community Information Systems (ACIS) Group, Chair
 * of Computer Science 5 (Databases & Information Systems), RWTH Aachen
 * University, Germany All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * Neither the name of the ACIS Group nor the names of its contributors may be
 * used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

var client;

var init = function() {

  var iwcCallback = function(intent) {
    // define your reactions on incoming iwc events here 
    console.log(intent);

  };

  client = new Las2peerWidgetLibrary("$Microservice_Url$/music", iwcCallback, '*');
Y({
  db: {
    name: 'memory'
  },
  connector: {
    name: 'websockets-client',
    room: 'cae-room'
  },
  sourceDir: "http://y-js.org/bower_components",
  share: {
    div_859aa:'Text' ,
    intents: 'Map'
  }
}).then(function (y) {
  window.yTextarea = y
  y.share.div_859aa.bind(document.getElementById('div_859aa'))

}).catch(function(y) {
  console.log("YJS failed to load");
});

getData(null, true)


}

var initClient = function(y) {
  this.client = new Las2peerWidgetLibrary("", iwcCallback, "127.0.0.1:8073", y);
  console.log("Client initialized");
};

// getData
var getData = function(param, isList){

client.sendRequest("GET", "songs", "", "", {}, false,
function(data, type) {
  console.log(data);

  if(isList) {
    var div = document.getElementById('div_2d759');
    buildList(div, data.songs);
  } else {
    var div = document.getElementById('div_859aa');
    var result = data.songs.filter(x => x.id === param);
    buildDetail(div, result[0]);
  }
},
function(error) {
  console.log(error);
});

  //Additional own javascript

}

// buildList
var buildList = function(root, arr){


  var ul = document.createElement('ul');
  var li;
  var a;

  root.appendChild(ul);

  arr.forEach(function(item) {
    li = document.createElement('li');
    li.appendChild(document.createTextNode(item.title));
    if(true) {
      a = document.createElement('a');
      a.appendChild(document.createTextNode($(li).text()));
      a.href = "#";
      a.addEventListener("click",
        function() { getData(item.id , false); });
      $(li).html(a);
    }
    ul.appendChild(li); // append the list item to the ul
  });

  //Additional own javascript

}

// buildDetail
var buildDetail = function(root, arr){

/**dtl**/

$(root).html("");
for (var key in arr) {
    var text = key + " : " + arr[key];
    console.log(text);
    var p = document.createElement('p');
    p.appendChild(document.createTextNode(text));
    root.appendChild(p);
}

  //Additional own javascript

}


$(document).ready(function() {
  init();
});
