// VARIABLES
/**  Get focus element before open modal. Example : button */
var focusedElementBeforeModal = null;

/**Function for trap the tab focus inside the modal
 * @param  {HTMLElement} element Modal element
 * @param  {Function} closeFunction Function for close modal
 * @param  {} focusedElementBeforeModal 
 */
export async function trapFocus(element, closeFunction) {
  focusedElementBeforeModal = document.activeElement;

  // Listen for and trap the keyboard
  element.addEventListener("keydown", trapTabKey);

  var focusableElementsString =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

  var focusableElements = element.querySelectorAll(focusableElementsString);

  focusableElements = Array.prototype.slice.call(focusableElements);

  var firstTabStop = focusableElements[0];
  var lastTabStop = focusableElements[focusableElements.length - 1];

  firstTabStop.focus();

  /**Check the key press by user
   * @param  {} e
   */
  function trapTabKey(e) {
    // Check for TAB key press
    if (e.keyCode === 9) {
      // SHIFT + TAB
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }
        // TAB
      } else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }

    // ESCAPE
    if (e.keyCode === 27) {
      closeFunction();
      focusedElementBeforeModal.focus();
    }
  }
}

/**Focus the last element before open modal
 */
export async function focusLastElementBeforeModal() {
  focusedElementBeforeModal.focus();
}
