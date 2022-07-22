"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 *
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);


/** Show submit form when "submit" is clicked */

function navSubmitForm(evt) {
  console.debug("navSubmitForm",evt);
  console.log('nav event handled');
  evt.preventDefault();
  $submitForm.show();

}

$navSubmit.on("click", navSubmitForm);

/** Show user favorites when "favorites" is clicked
 * Hides main story list
 */

function navFavorites(evt) {
  console.debug("navFavorites",evt);
  console.log('favorites handled');
  evt.preventDefault();
  $allStoriesList.hide();
  getAndShowFavoriteStories();
}

$navFavorite.on("click", navFavorites);


/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}


/** TODO: Handle star fill
 * When star is clicked, check if story is in currentUsers favorites
 * add to favorites if not inside favorites array
 * remove from favorites if inside favorites array
*/
function addOrRemoveFavorite(evt){
  $(evt.target).toggleClass("bi-star bi-star-fill");
  const clickId = evt.target.parentElement.id;

  let getStoryById = Story.getStoryById(clickId);

  for(let favorite of currentUser.favorites) {
    //check whole object?
    if (favorite.storyId === getStoryById.storyId) {
      console.log("deleting favorite");
      currentUser.deleteFavorite(favorite);
      return;
    }
  }

  currentUser.addFavorite(getStoryById);

}

$storiesContainer.on("click", "#favorite-button", addOrRemoveFavorite);

// function fillUnfillStar(evt){

//   $(evt.target).toggleClass("bi-star bi-star-fill");
// }

// $storiesContainer.on("click", "#favorite-button", fillUnfillStar);