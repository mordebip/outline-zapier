const createDoc = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: `https://getoutline.com/api/documents.create`,
    body: JSON.stringify({
      collectionId: bundle.inputData.collectionId,
      publish: bundle.inputData.publish,
      title: bundle.inputData.title,
      text: bundle.inputData.text
    })
  });
  return responsePromise
    .then(response => JSON.parse(response.content))
    .then(content => content.data);
};

module.exports = {
  key: 'doc',
  noun: 'Document',

  display: {
    label: 'Create Document',
    description: 'Creates a document.'
  },

  operation: {
    inputFields: [
      {key: 'collectionId', label:'Collection', required: true, dynamic: 'collection.id.name'},
      {key: 'title', label:'Title', required: true},
      {key: 'text', label:'Text', required: true},
      {key: 'publish', label:'Publish', required: true, type: 'boolean'}
    ],
    perform: createDoc
  }
};
