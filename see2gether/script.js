$(function () {
	var video = $('#video')[0];
	var source = $('#source')[0];
	var form = $('#form')[0];
	var openButton = $('#openButton')[0];
	const userId = Date.now();
	var userName = String(userId);
	var prevTime = 0;
	var prevSrc = '';
	var roomId = window.location.search.substr(1);
	var baseUrl = location.protocol+'//'+location.host+location.pathname;
	var jsonUrl = "https://jsonstorage.net/api/items/"+roomId;

	var data = {
		"playlist": {},
		"users": {},
		"userId":  userId,
		"src": '',
		"duration": video.duration,
		"currentTime": video.currentTime,
		"pause": true
	}

	if (!roomId){
		$.ajax({
			url: jsonUrl,
			type: "POST",
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data, textStatus, jqXHR) {
				roomId = data.uri.slice(data.uri.lastIndexOf('/')+1);
				jsonUrl += roomId;
				history.pushState('', '', baseUrl+'?'+roomId);
				setInterval(getData, 1000);
			}
		})
	}else{
		setInterval(getData, 1000);
	}

	updateUserlist();

	function getData(){
		$.get(jsonUrl, function (data, textStatus, jqXHR) {
			$('#debug')[0].innerHTML=JSON.stringify(data,null,2);
			if(data.src!==prevSrc){
				prevSrc=data.src;
				source.src = data.src;
				video.load();
				data.src ? $('#video').show() : $('#video').hide();
			}
			
			if(data.userId !== userId ) {
				data.pause ? video.pause() : video.play();
				if (prevTime !== data.currentTime && Math.abs(video.currentTime - data.currentTime) > 1) {
					video.currentTime = data.currentTime
					prevTime = data.currentTime
				}
			}
		});
	}

	function updateData(event){
		if(event.type==='click'){
			if(!form.value){
				return
			}
			source.src = form.value;
			video.load()
		}
		data.userId = userId;
		data.src = (source.src === baseUrl+'?'+roomId) ? '' : source.src;
		data.duration = video.duration;
		data.currentTime = video.currentTime;
		if (event.type==='play'){
			data.pause = false;
		}else if(event.type==='pause'){
			data.pause = true;
		}
		prevTime = data.currentTime
		sendData(data)
	}

	function sendData(data){
		$.ajax({
			url: jsonUrl,
			type:"PUT",
			data: JSON.stringify(data),
			contentType:"application/json; charset=utf-8",
			dataType:"json"
		});
	}

	function updateUserlist(){
		data.users[userId] = userName;
		sendData(data)
	}

	video.addEventListener('seeked', updateData);
	video.addEventListener('pause', updateData);
	video.addEventListener('play', updateData);
	openButton.addEventListener('click', updateData);
});
