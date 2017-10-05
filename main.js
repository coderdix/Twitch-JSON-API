
function getStreams() {
  
  var url      = 'https://api.twitch.tv/kraken/streams/';
  var clientId = 'nxvlwdqaz27phodkunapzj6tdw56fw';
  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "comster404", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];
  
  channels.forEach(function(channel) {
    function fcc_channels(type, name) {
      return 'https://api.twitch.tv/kraken/' + type + '/' + name + '/?client_id=' + clientId;
    }
    
    console.log(channel.status);
    
    $.getJSON(fcc_channels('channels', channel), function(data) {
      
      console.log(data);
      
      channelUrl  = data.url;
      channelImg  = data.logo;
      channel     = data.name;
      status      = data.status;
      game        = data.game;
      views       = data.views;
      
      if (game == null || game == undefined) {
        account = "text-danger'>offline";
      } else {
        account = "text-success'>online";
      }

      html = "<div class='media'><div class='media-left'><a href='" + 
      channelUrl + "' target='_blank'><img class='media-object' src='" + 
      channelImg + "' alt=''></a></div><div class='media-body'><h4 class='media-heading'>" + 
      channel + "</h4><span class='account-status " + 
      account + "</span><p>" +
      status + "<br>" + 
      game + " | " +
      views + "</p></div></div>";
      $('#fcc').prepend(html);
    }).fail(function(){
      console.log('error');
      $('#errors').append("<div class='item'>" + "<img src='" + channelImg + "'>" + "<h4>" + channel + "</h4>" + status + "</div>");
    });
  });
  
    
  $.ajax({
    url: 'https://api.twitch.tv/kraken/streams/',
    dataType: 'jsonp',
    data: {
      client_id: clientId,
      language: 'en',
      stream_type: 'all',
      limit: '100',
      callback: '?'
    },
    success: function(data) {
      var streamLength = data.streams.length;
      var next         = data._links['next'];
      
      for (i=0; i < streamLength; i++ ) {
        
        channel    = data.streams[i].channel.display_name;
        channelImg = data.streams[i].channel.logo;
        channelUrl = data.streams[i].channel.url;
        status     = data.streams[i].channel.status;
        game       = data.streams[i].channel.game;
        views      = data.streams[i].channel.views;
        
        if (game == null || game == undefined) {
          account = "text-danger'>offline";
        } else {
          account = "text-success'>online";
        }
        
        $('#channels').prepend(
          "<div class='media'><div class='media-left'><a href='" + 
          channelUrl + "' target='_blank'><img class='media-object' src='" + 
          channelImg + "' alt=''></a></div><div class='media-body'><h4 class='media-heading'>" + 
          channel + "</h4><span class='account-status " + 
          account + "</span><p>" +
          status + "<br>" + 
          game + " | " +
          views + "</p></div></div>"
        );
      }      
    },
    error: function(errorMsg, status, error) {
      alert(errorMsg.errorMsg);
    }
  });
  
}

$(document).ready(function() {
  getStreams();
});
  


