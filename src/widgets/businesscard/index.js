import React    from "react";
import ReactDOM from "react-dom";
import Card     from "./card";
import WebAPI   from "../../WebAPI";
import parseUrl from "../../util/parseUrl";
import { I18nextProvider } from 'react-i18next';
import i18n     from "../../i18n";

const rootElement = document.querySelector('#app');

const flatten = nestedArray => nestedArray.reduce(
  (a, next) => a.concat(Array.isArray(next) ? flatten(next) : next), []
);

let store = {};

const render = () => {
  ReactDOM.render(
    <I18nextProvider i18n={ i18n } >
      <Card entry={ store.entry }/>
    </I18nextProvider>, rootElement);
};

render();

const {entry: entryID, orgTag} = parseUrl(window.location.href).params;

WebAPI.getEntries([entryID], orgTag, (err, res) => {
  if(!err && res.length > 0) {
    store.entry = res[0];
    render();
  }
});