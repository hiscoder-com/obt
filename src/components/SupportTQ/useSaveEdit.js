import { useEdit } from 'gitea-react-toolkit';
function useSaveEdit({
  bookId,
  chapter,
  verse,
  item,
  fetchResponse,
  cardResourceId,
  owner,
  content,
  authentication,
  languageId,
}) {
  const sha = getSha({
    item,
    fetchResponse,
    cardResourceId,
  });
  console.log({ content });
  const { isEditing, onSaveEdit } = useEdit({
    sha,
    owner,
    content,
    config: {
      cache: { maxAge: 0 },
      ...authentication?.config,
      token: authentication?.token,
      timeout: 120000,
    },
    author: 'Valyukhov',
    token: authentication?.token,
    branch: 'test',
    filepath: `${bookId}/${String(chapter).padStart(2, '0')}/${String(verse).padStart(
      2,
      '0'
    )}.md`,
    repo: `${languageId}_${cardResourceId}`,
  });

  function getSha({ item, fetchResponse, cardResourceId }) {
    if (cardResourceId === 'twl') {
      return fetchResponse?.data?.sha;
    }

    // Each item in the items array may have a unique fetchResponse.
    return item?.fetchResponse?.data?.sha || fetchResponse?.data?.sha || null;
  }
  async function handleSaveEdit() {
    // Save edit, if succesful trigger resource reload and set saved to true.
    const saveEdit = async (branch) => {
      await onSaveEdit(branch).then((success) => {
        if (success) {
          console.info('Reloading resource');
          // reloadResource()
          // setSaved(true)
          // setSavedChanges(cardResourceId, true)
        } else {
          // setSavedChanges(cardResourceId, false)
        }
      });
    };

    // If not using user branch create it then save the edit.
    // if (!usingUserBranch) {
    //   await startEdit().then((branch) => saveEdit(branch))
    // } else {// Else just save the edit.
    await saveEdit();
    // }
  }
  return handleSaveEdit;
}

export default useSaveEdit;
