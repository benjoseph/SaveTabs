// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getAllTabUrls(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    currentWindow: true,
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    callback(tabs);
  });
}

function displayList(tabs) {
  
   for(i=0;i<tabs.length;i++){
        document.getElementById('status').innerHTML += tabs[i].title+"\<br\>";
      }
      
}

function displayList2(tabs) {
  console.log(tabs.length)
   for(i=0;i<tabs.length;i++){
   	console.log('1')
        document.getElementById('status').innerHTML += tabs[i].url;
        console.log('2')
      }
      
}

function saveTabs(tabs){
	chrome.storage.local.set({'tabs': tabs}, function() {
    	 console.log('Tabs saved');
        });
}

function RestoreTabs(tabs){
	chrome.storage.local.get('tabs', function(tabs) {
    	 console.log('Tabs restored:');
    	 displayList2(tabs);
        });
}

document.addEventListener('DOMContentLoaded', function() {
  
  getAllTabUrls(function(tabs) {

    displayList(tabs);
  	document.getElementById("savetabsbutton").addEventListener('click',saveTabs(tabs));
  	document.getElementById("restoretabsbutton").addEventListener('click',RestoreTabs);
  });
});
