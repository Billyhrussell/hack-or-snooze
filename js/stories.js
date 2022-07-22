"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

function getAndShowFavoriteStories() {

  $favoritesList.empty();

  //loop through favorites array on currentUser
  for (let favorite of currentUser.favorites) {
    const $favorite = generateStoryMarkup(favorite);
    $favoritesList.append($favorite);
  }

  $favoritesList.show();

}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/**DONE: Take user-submitted story
 * get data from form,
 * call .addStory()
 * put new story on page
 *
 * Make sure to pick a good name!
 */

/**
 * Takes user form submission and adds to storyList
 */
 async function formSubmitted(evt) {
  console.debug("form has been submitted", evt);
  evt.preventDefault();

  const storyObject = {
    author : $("#author").val(),
    title : $("#title").val(),
    url : $("#url").val()
  }

  const newStory = await storyList.addStory(currentUser, storyObject);
  console.log(newStory);

  const $story = generateStoryMarkup(newStory);
  $allStoriesList.prepend($story);
}

//Event handler for user form submission
$submitForm.on("click", "#submit-form-button", formSubmitted);