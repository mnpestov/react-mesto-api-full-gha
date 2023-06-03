const page = document.querySelector('.page');
const popupCardOpenButton = page.querySelector('.button_type_add');
const popupCardEditButton = page.querySelector('.button_type_edit');

const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  opacityLargeClass: 'opacity-transition_type_large'
};

export { config, popupCardEditButton, popupCardOpenButton };