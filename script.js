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
    let listName = document.getElementById("inputList").value;
    if(listName.trim()!==""){
        let listBox = document.createElement("div");
        listBox.id = id;
        listBox.className = "listBoxSmall";
        listBox.innerHTML =`<p class="listTitle" onclick="displayBig(this.parentNode.id)">${listName} 
        </p><hr><span class="listButtons small"><i class="fas fa-trash-alt red" id="trash" 
        onclick="deleteList(this.parentNode.parentNode.id, this.parentNode.parentNode.className)">
        </i>&ensp;<i class="fas fa-plus-circle blue" id="add" onclick="newItem()"></span>`
        document.getElementById("array").appendChild(listBox);
        backHome();
        obj.id = id;
        obj.name = listName;
        obj.innerHTML = listBox.innerHTML;
        objList.push(obj);
    }
    else{
        alert("Please fill the input field!");
    }
}
function displayBig(parentId){
    document.getElementById("homePage").style.display = "none";
    document.getElementById("listPage").style.display = "flex";
    for(let i =0; i<objList.length;i++){
        if(objList[i].id==parentId){
            document.getElementById("listPageBox").innerHTML =objList[i].innerHTML;
              document.getElementById("listPageBox").className = parentId;
            document.getElementById("listPageHead").innerHTML =`<hr><span>${objList[i].name}</span>
            <i class="fas fa-arrow-circle-left" onclick="backHome()">&ensp;<span class="iconname">BACK</span></i>`;
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
function newItem(){
document.getElementById("newItemPage").style.display = "inherit";
  document.getElementById("homePage").style.filter = "blur(8px)";
  document.getElementById("listPage").style.filter = "blur(8px)";

}