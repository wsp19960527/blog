// 原型继承
function Parent(){
  this.name = 'Parent';
}

Parent.prototype.sayHello = function(){
  console.log('Hello');
}

function Child(){
  this.type = 'Child';
}

// 继承父类
Child.prototype = new Parent();
const child = new Child();


// 构造函数继承
function Parent2(name){
  this.name = name;
  this.sayHi = function(){
    console.log('Hi from Parent2');
  }
}
function Child2(name){
  Parent2.call(this, name);
}
let child2 = new Child2('Child2');
child.sayHi()


// 组合继承
function Parent(name){
  this.name = name;
}

Parent.prototype.sayHello = function(){
  console.log('Hello');
}

function Child(name, age){
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;

// 原型式继承
var parent = {
  name:'Parent',
  sayHello: function(){
    console.log('Hello from Parent');
  }
}

var child4 = Object.create(parent);
child4.sayHello();


// 寄生式组合式继承
function Parent5(name){
  this.name = name;
  this.sayHi = function(){
    console.log('Hi from Parent5');
  }
  this.getName = function(){
    console.log(this.name)
    return this.name;
  }
}

function Child5(name, age){
  Parent5.call(this, name);
  this.age = age;
}

Child5.prototype = Object.create(Parent5.prototype);
Child5.prototype.constructor = Child5;

let child5 = new Child5('Child5', 18);
child5.sayHi();
child5.getName();

// 寄生式继承
function createChild(obj){
  var child = Object.create(obj);
  child.sayHi = function(){
    console.log('Hi from Child6');
  }
  child.getName = function(){
    console.log(this.name)
    return this.name;
  }
  return child
}


var xhr = new XMLHttpRequest();
xhr.open('get', 'https://www.baidu.com');
xhr.onreadystatechange = function(){
  if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
    console.log(xhr.responseText);
  }else{
    console.error('请求失败');
  }
}
xhr.send();


