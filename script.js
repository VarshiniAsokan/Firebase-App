
let pickList = document.querySelector('#pick-list');
const form = document.querySelector('#add-picklist-form');
const searchForm = document.querySelector('#search-picklist-form');

// create element & render cafe
function renderPickList(doc){
  
    let li = document.createElement('li');
    let quantity = document.createElement('span');
    let partId = document.createElement('span');
    let userId = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    quantity.textContent = doc.data().Quantity;
    partId.textContent = doc.data()['Part ID'];
    userId.textContent = doc.data().UserID;

    li.appendChild(userId);
    li.appendChild(partId);
    li.appendChild(quantity);

  pickList.appendChild(li);
}

// db.collection('Picklist').where('Part ID','==','1').orderBy('Quantity').get().then((snapshot)=> {
// 	console.log(snapshot.docs);
// 	snapshot.docs.forEach(doc =>{
// 		console.log(doc.data());
// 		renderPickList(doc);
// 	})
// })

db.collection('Picklist').get().then((snapshot)=> {
	console.log(snapshot.docs);
	snapshot.docs.forEach(doc =>{
		console.log(doc.data());
		renderPickList(doc);
	})
})
console.log(searchForm.searchuserid);

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  var child = pickList.lastElementChild; 
  while (child) { 
    pickList.removeChild(child); 
    
    console.log(pickList.lastElementChild); 
      child = pickList.lastElementChild; 
  };
  db.collection('Picklist').where('UserID','==',searchForm.searchuserid.value).get().then((snapshot)=> {
    console.log(snapshot.docs);
    snapshot.docs.forEach(doc =>{
      console.log(doc.data());
      renderPickList(doc);
    })
  })
  searchForm.searchuserid.value = '';
});



form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('Picklist').add({
      ['Part ID']: form.partid.value,
      Quantity: form.quantity.value,
      UserID: form.userid.value
  });
  form.partid.value = '';
  form.quantity.value = '';
  form.userid.value = '';
});
