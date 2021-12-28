import React from 'react';

import localforage from 'localforage';
import JSZip from 'jszip';

const baseURL = 'https://git.door43.org/';
const apiPath = 'api/v1';

const cacheStore = localforage.createInstance({
  driver: [localforage.INDEXEDDB],
  name: 'web-cache',
});
/**
 *
 * https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md
 * https://github.com/futurepress/react-native-static-server
 * https://gist.github.com/paldepind/8cbc430575cd075144d291b0eff463fc
 * https://github.com/react-native-webview/react-native-webview/issues/428
 * https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md
 * Попробовать сделать на реакт натив через веб вью. Если нет интернета то загружать локальную страницу, которая добавит в кеш все необходимые файлы чтобы сайт смог работать без интернета. После этого перезагружается страница, если файлы добавлены то переходить на сайт обт. Сейчас там через вебвью не работает сервис воркер, переделать чтобы работал тогда с локалфоредж.
 */
function UploadResources() {
  const onChange = (evt) => {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      const zip = new JSZip();
      zip.loadAsync(reader.result).then(function (zip) {
        zip.forEach(function (relativePath, zipEntry) {
          if (
            !zipEntry.dir &&
            ['yaml', 'usfm'].includes(zipEntry.name.substring(zipEntry.name.length - 4))
          ) {
            console.log({ name: zipEntry.name });
            const [repo, file] = zipEntry.name.split('/');
            const owner = 'ru_gl';
            zipEntry.async('string').then(
              function success(content) {
                caches.open('uw-git-cache').then(function (cache) {
                  let blob = new Blob([content]);
                  var init = { status: 200, statusText: 'OK' };
                  let res = new Response(blob, init);
                  const uri =
                    baseURL +
                    apiPath +
                    '/repos/' +
                    owner +
                    '/' +
                    repo +
                    '/contents/' +
                    file +
                    '?ref=master';
                  let req = new Request(uri);
                  cache.put(req, res);
                  blob.text().then((res) => {
                    cacheStore.setItem(uri, {
                      expires: 1,
                      data: {
                        data: res,
                        status: 200,
                        statusText: 'OK',
                      },
                    });
                  });
                });
              },
              function error(e) {
                console.log({ error: e });
              }
            );
          }
        });
      });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <input type="file" onChange={onChange} name="file" className="file" accept=".zip" />
      <button
        onClick={() => {
          cacheStore
            .keys()
            .then(function (keys) {
              keys.forEach((el) => {
                cacheStore.removeItem(el);
                /*if (['qa', 'bg'].includes(el.split('/')[2].split('.')[0])) {
                  cacheStore.removeItem(el);
                } else {
                  cacheStore.getItem(el).then((val) => {
                    console.log(val);
                  });
                }*/
              });
            })
            .catch(function (err) {
              // This code runs if there were any errors
              console.log(err);
            });
        }}
      >
        test
      </button>
    </>
  );
}

export default UploadResources;
