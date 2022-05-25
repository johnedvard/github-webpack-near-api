import _ from 'lodash';
import { keyStores } from 'near-api-js';
function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();
  console.log(keyStore);
  return element;
}
component();
document.body.appendChild(component());
