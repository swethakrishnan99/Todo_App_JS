let itemsList =[];
let currentList;
function noLists(){
  if(itemsList.length !== 0){
    document.getElementById("noList").style.display ="none";
  }
  else{
    document.getElementById("noList").style.display ="block";
  }
}
    
function newlistPopup() {
  document.getElementById("homePage").classList.add("blur");
  document.getElementById("newListPopup").classList.add("popUp");
  document.getElementById("newListPopup").classList.remove("none");
}

function newItemPopup(flag,element){
  currentList =element;
  console.log(element);
  console.log(flag);
  document.getElementById("newItemPopup").classList.add("popUp");
  document.getElementById("newItemPopup").classList.remove("none");
  if (flag ===0){
    document.getElementById("homePage").classList.add("blur");
  }
  else{
    document.getElementById("selectedTodo").classList.add("blur");
  }
}

function backHome(flag){
  if(flag===0){
    document.getElementById("newListPopup").classList.add("none");
    document.getElementById("homePage").classList.remove("blur");
  }
  else if(flag===1){
    document.getElementById("homePage").style.display ="block";
    document.getElementById("selectedTodo").classList.add("none");
    document.getElementById("selectedTodo").classList.remove("container");
    createCards();    
  }
  else{
    document.getElementById("newItemPopup").classList.add("none");
    document.getElementById("selectedTodo").classList.remove("blur");
      document.getElementById("homePage").classList.remove("blur");
  }
  
  noLists();
}

function addToList(){
  let heading = document.getElementById("input1").value;
  if(heading.trim()===""){
    alert("please fill the inputfield");
  }
  else{
    const obj = {
      id : Date.now(),
      heading,
      taskList :[]
    }
    itemsList.push(obj);
    backHome(0)
    const node = document.createElement("div");
    node.setAttribute("class", `card`);
    node.setAttribute("data-key", itemsList[itemsList.length-1].id);
    node.innerHTML = `<p class="card-heading" onclick = "redirect(this)">${itemsList[itemsList.length-1].heading} </p>
    <hr>
    <div class="footer-1">
    <p class='btn-completed' onclick ="removeList(this)"><i class="fas fa-trash-alt" ></i></p>
    <p class='btn-add' onclick ="newItemPopup(0,this)"><i class="fas fa-plus-circle " ></i></p>
    </div>
    <ul style="list-style-type:none;"></ul>`;
    document.getElementById("lists").appendChild(node);
  }
}
function createCards(){
  document.getElementById("lists").innerHTML = "";
  for(let i =0;i<itemsList.length;i++){
    const node = document.createElement("div");
    node.setAttribute("class", `card`);
    node.setAttribute("data-key", itemsList[i].id);
    node.innerHTML = `<p class="card-heading"  onclick = "redirect(this)">${itemsList[i].heading}</p>
    <hr>
    <div class="footer-1">
    <p class='btn-completed' onclick ="removeList(this)"><i class="fas fa-trash-alt"></i></p>
    <p class='btn-add' onclick ="newItemPopup(0,this)"><i class="fas fa-plus-circle " ></i></p>
    </div>
    <ul style="list-style-type:none;"></ul>`;
    document.getElementById("lists").appendChild(node);
    currentList=itemsList[i];
    for(let j=0;j<currentList.taskList.length;j++){
      const node1 = document.createElement("li");
      node1.setAttribute("class", `item`);
      node1.setAttribute("data-key",currentList.taskList[j].id);
      if(currentList.taskList[j].completed == true){
         node1.innerHTML =`${currentList.taskList[j].task}`;
         node1.style.textDecoration="line-through";
         node1.style.color ="red";
      }
      else{
        node1.innerHTML =`${currentList.taskList[j].task}<button class="marked" onclick="markedDone(this)">Mark Done</button>`;
      }
     node.childNodes[6].appendChild(node1);
    }
  }
}
    
function removeList(element){
  parentElement = element.parentNode.parentNode;
  let temp = parentElement.getAttribute("class");
   for(let i=0;i<itemsList.length;i++) {
      if (itemsList[i].id == parentElement.getAttribute("data-key")){
        itemsList.splice(i,1);
      }
    }
    createCards()
  if(temp != "card"){
      backHome(1);
  }
   noLists()
}

function redirect(element){
  const id = element.parentNode.getAttribute("data-key");
  for(let i=0;i<itemsList.length;i++){
    if(itemsList[i].id == id){
      currentList=itemsList[i];
    }
  }
  document.getElementById("selectedList").innerHTML="";
  for(let j=0;j<currentList.taskList.length;j++){
      const node1 = document.createElement("li");
      node1.setAttribute("class", `item`);
      node1.setAttribute("data-key",currentList.taskList[j].id);
      if(currentList.taskList[j].completed == true){
        node1.innerHTML =`${currentList.taskList[j].task}`;
        node1.style.textDecoration="line-through";
        node1.style.color ="red";
      }
      else{
        node1.innerHTML =`${currentList.taskList[j].task}<button class="marked" onclick="markedDone(this)">Mark Done</button>`;
      };
      document.getElementById("selectedList").appendChild(node1);
    }

  document.getElementById("selectedHeading").innerHTML = currentList.heading;
  document.getElementById("selectedHeading1").innerHTML = currentList.heading;
  document.getElementById("selectedHeading1").parentNode.setAttribute("data-key",id);
  document.getElementById("homePage").style.display ="none";
  document.getElementById("selectedTodo").classList.add("container");
  document.getElementById("selectedTodo").classList.remove("none");
  
}

function addToItems(){
  let task = document.getElementById("input2").value;
  if(task.trim()===""){
    alert("please fill the inputfield");
  }
  else{
    let taskobj ={task,completed: false,id:Date.now()}
    let index1;
    let parentId = currentList.parentNode.parentNode.getAttribute("data-key");
    for(let i =0;i<itemsList.length;i++){
      if(itemsList[i].id ==parentId){
        itemsList[i].taskList.push(taskobj);
        index1 = itemsList[i]
      }
    }
    const node = document.createElement("li");
    node.setAttribute("class", `item`);
    node.setAttribute("data-key", index1.taskList[index1.taskList.length-1].id);
    node.innerHTML =`${index1.taskList[index1.taskList.length-1].task}<button class="marked" onclick = "markedDone(this)">Mark Done</button>`;
    currentList.parentNode.parentNode.childNodes[6].appendChild(node);
    backHome(3)
  }
}

function markedDone(element){
  id = element.parentNode;
  parentId =element.parentNode.parentNode.parentNode;
  console.log(parentId);
  for(let i =0;i<itemsList.length;i++){
    if(itemsList[i].id ==parentId.getAttribute("data-key")){
      for(j=0;j<itemsList[i].taskList.length;j++){
        if(itemsList[i].taskList[j].id == id.getAttribute("data-key")){
          itemsList[i].taskList[j].completed =true;
          element.parentNode.style.textDecoration ="line-through";
          element.parentNode.style.color="red";
          element.remove();
        }
      }

    }
  }
}
 
