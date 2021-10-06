let objList =[];
function newList() {
  document.getElementById("newListPage").style.display = "inherit";
  document.getElementById("homePage").style.filter = "blur(8px)";
}
function backHome(){
    document.getElementById("homePage").style.display = "inherit";
     document.getElementById("newListPage").style.display = "none";
     document.getElementById("newItemPage").style.display = "none";
     document.getElementById("listPage").style.display = "none";
     document.getElementById("homePage").style.filter = "blur(0px)";
     document.getElementById("listPage").style.filter = "blur(0px)";
}

function createList(){
    var obj ={};
    var id = new Date ().valueOf();
    var clicked =false;
    var items =[];
    let listName = document.getElementById("inputList").value;
    if(listName.trim()!==""){
        let listBox = document.createElement("div");
        listBox.id = id;
        listBox.className = "listBoxSmall";
        listBox.innerHTML =`<p class="listTitle" onclick="displayBig(this.parentNode.id)">${listName} 
        </p><hr><span class="listButtons small"><i class="fas fa-trash-alt red" id="trash" 
        onclick="deleteList(this.parentNode.parentNode.id, this.parentNode.parentNode.className)">
        </i>&ensp;<i class="fas fa-plus-circle blue" id="add" onclick="newItem(this.parentNode.parentNode.id, 
        this.parentNode.parentNode.className)"></span>`
        document.getElementById("array").appendChild(listBox);
        backHome();
        obj.id = id;
        obj.name = listName;
        obj.click = clicked;
        obj.items =items;
        obj.innerHTML = listBox.innerHTML;
        objList.push(obj);
    }
    else{
        alert("Please fill the input field!");
    }
}
function displayBig(parentId){
  let index = -1;
    document.getElementById("homePage").style.display = "none";
    document.getElementById("listPage").style.display = "flex";
    for(let i =0; i<objList.length;i++){
        if(objList[i].id==parentId){
          index = i;
            document.getElementById("listPageBox").innerHTML =objList[i].innerHTML;
              document.getElementById("listPageBox").className = parentId;
            document.getElementById("listPageHead").innerHTML =`<hr><span>${objList[i].name}</span>
            <i class="fas fa-arrow-circle-left" onclick="backHome()">&ensp;<span class="iconname">BACK</span></i>`;
        }
    }
    for(let i=0; i<objList[index].items.length;i++){
    if(objList[index].items[i].completed ==true){
      console.log("true");
      document.getElementById(objList[index].items[i].id).style.textDecoration = "line-through";
      document.getElementById(objList[index].items[i].id).style.color ="red";
      document.getElementById(objList[index].items[i].id).innerHTML=objList[index].items[i].item;
    }
  }
}
function deleteList(id, classname){
    if(id ==="listPageBox"){
        id =classname;
        backHome()
    }
    var listBox = document.getElementById(id);
    listBox.remove();
      for(let i =0; i<objList.length;i++){
        if(objList[i].id==id){
            objList.splice(i,1);
        }
      }
}

function newItem(id, classname){
 
  if(id ==="listPageBox"){
        id =classname;
  }
  for(let i =0; i<objList.length;i++){
        if(objList[i].id==id){
            objList[i].click=true;
        }
    }
  document.getElementById("newItemPage").style.display = "inherit";
  document.getElementById("homePage").style.filter = "blur(8px)";
  document.getElementById("listPage").style.filter = "blur(8px)";
}
function createItem(){
  let index =-1;
  let parentId = -1;
  let id ="0"
  let value = document.getElementById("inputItem").value;
  let list = document.createElement("ul");
  let itemvalues ="";
  for(let i =0; i<objList.length;i++){
      if(objList[i].click===true){
          index =i;
          objList[i].items.push({"id":`${index}_${objList[i].items.length}`,"item":value, completed :false});
          objList[i].click=false;
          parentId = objList[i].id;
          id +=parentId;
          break;
      }
    }
    list.id =id;
    document.getElementById(parentId).appendChild(list);
    for(let i =0; i<objList[index].items.length;i++){
        itemvalues += `<li id="${objList[index].items[i].id}">${objList[index].items[i].item}&ensp;
        <button onclick="markDone(this)">Mark Done</button></li>`
    }
    document.getElementById(id).innerHTML =itemvalues;
    objList[index].innerHTML =document.getElementById(parentId).innerHTML;
    if(document.getElementById("homePage").style.display === "none"){
      displayBig(parentId);
    }
    for(let i=0; i<objList[index].items.length;i++){
    if(objList[index].items[i].completed ==true){
      document.getElementById(objList[index].items[i].id).style.textDecoration = "line-through";
      document.getElementById(objList[index].items[i].id).style.color ="red";
      document.getElementById(objList[index].items[i].id).innerHTML=objList[index].items[i].item;
    }
  }
    document.getElementById("newItemPage").style.display = "none";
    document.getElementById("homePage").style.filter = "blur(0px)";
    document.getElementById("listPage").style.filter = "blur(0px)";

}
function markDone(value){
  let id =value.parentNode.id;
  console.log(id)
  let parentId = value.parentNode.parentNode.id;
  let index1 =-1;
  
  for(let i=0; i<objList.length; i++){
    if (objList[i].id == parentId){
       index1 =i;
    }
  }
  for(let i=0; i<objList[index1].items.length;i++){
    if(objList[index1].items[i].id==id){
      objList[index1].items[i].completed =true;
    }
  }
  for(let i=0; i<objList[index1].items.length;i++){
    if(objList[index1].items[i].completed ==true){
      document.getElementById(objList[index1].items[i].id).style.textDecoration = "line-through";
      document.getElementById(objList[index1].items[i].id).style.color ="red";
      document.getElementById(objList[index1].items[i].id).innerHTML=objList[index1].items[i].item;
    }
  }

}
