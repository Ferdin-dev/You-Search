const input = document.querySelector('input');
const btn = document.querySelector('button');

// Element for the DOM variables
const imageThumbnail = document.querySelector('.image-thumbnail');
const userImageProfile = document.querySelector('.user-image-profile');
const youtubeVideoTitle = document.querySelector('.youtube-video-title');
const youtubeUserName = document.querySelector('.channel-title');
const videoUrl = document.querySelector('.youtube-video-url');

let params = '';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6c4c554585msh648c1448118d0c9p156aadjsnad1d553a7d6c',
		'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
	}
};

let clearVideoList = () => {
	// Clear the existing video list
	const videoList = document.getElementById('video-list');
	videoList.innerHTML = '';
};

let callSearchFunction = async () => {
	params = input.value;
	const count = 24; // Set the desired count of items

	// Clear the existing video list before fetching new data
	clearVideoList();

	await fetch(`https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${params}&count=${count}`, options)
		.then(response => response.json())
		.then(data => {
			data.items.map(item => {
				// Process each item and create elements for the video

				const thumbnailUrl = item.bestThumbnail.url;
				const videoTitle = item.title;
				const channelTitle = item.author.name;
				const videoUrl = item.url;
				const authorPic = item.author.bestAvatar.url;
				const channelAuthorLink = item.author.url;

				// Create elements for the video
				const videoContainer = document.createElement('div');
				videoContainer.classList.add('video');

				const youtubeVideoContainer = document.createElement('div');
				youtubeVideoContainer.classList.add('youtube-video-container');

				const thumbnailContainer = document.createElement('div');
				thumbnailContainer.classList.add('youtube-thumbnail');

				const thumbnailLink = document.createElement('a');
				thumbnailLink.href = videoUrl;

				const thumbnailImage = document.createElement('img');
				thumbnailImage.src = thumbnailUrl;
				thumbnailImage.alt = 'Video Thumbnail';

				thumbnailLink.appendChild(thumbnailImage);
				thumbnailContainer.appendChild(thumbnailLink);

				const videoDetailContainer = document.createElement('div');
				videoDetailContainer.classList.add('youtube-video-detail');

				const videoTitleContainer = document.createElement('div');
				videoTitleContainer.classList.add('video-title');

				const userIconContainer = document.createElement('div');
				userIconContainer.classList.add('user-icon');

				const userIcon = document.createElement('img');
				userIcon.src = authorPic;
				userIcon.alt = 'Author Picture';

				userIconContainer.appendChild(userIcon);

				const videoTitleLink = document.createElement('a');
				videoTitleLink.href = videoUrl;

				const videoTitleElement = document.createElement('h4');
				videoTitleElement.classList.add('youtube-video-title');
				videoTitleElement.textContent = videoTitle;

				videoTitleLink.appendChild(videoTitleElement);

				videoTitleContainer.appendChild(userIconContainer);
				videoTitleContainer.appendChild(videoTitleLink);

				videoDetailContainer.appendChild(videoTitleContainer);

				youtubeVideoContainer.appendChild(thumbnailContainer);
				youtubeVideoContainer.appendChild(videoDetailContainer);

				const channelContainer = document.createElement('div');
				channelContainer.classList.add('youtube-channel');

				const channelLink = document.createElement('a');
				channelLink.href = channelAuthorLink;

				const channelTitleElement = document.createElement('p');
				channelTitleElement.classList.add('channel-title');
				channelTitleElement.textContent = channelTitle;

				channelLink.appendChild(channelTitleElement);
				channelContainer.appendChild(channelLink);

				videoContainer.appendChild(youtubeVideoContainer);
				videoContainer.appendChild(channelContainer);

				// Append the video to the DOM
				const videoList = document.getElementById('video-list');
				videoList.appendChild(videoContainer);
			});
		})
		.catch(err => console.log(err));

	input.value = '';
};

btn.addEventListener('click', callSearchFunction);

const btnSearch = document.querySelector('.btn-search');
const youtubeIcon = document.querySelector('.youtube-icons');
const searchInput = document.querySelector('.search-input');

btnSearch.addEventListener('click', () => {
	youtubeIcon.classList.toggle('youtube-icons-close');
	searchInput.classList.toggle('shown');
});
