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


$body.on("click", "#favorite-button", addOrRemoveFavorite);

function addOrRemoveFavorite(evt){
  //running if statement, check if story is favorited
  // if favorited, remove
  // if not favorited, add
  const clickId = evt.target.parentElement.id;

  console.log(typeof clickId);

  if(currentUser.favorites.length === 0){
    currentUser.addFavorite(storyList.id);
  }
  for(let favorite of currentUser.favorites){
    console.log(favorite);
    console.log("this opened")
    if(favorite.storyId === clickId){
      console.log("delete favorite")
      currentUser.deleteFavorite(favorite);
    } else{
      console.log("favorite added")
      currentUser.addFavorite(favorite);
    }
  }

}