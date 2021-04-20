alert('hungdo');
console.log('hungdo');
console.log(123);


var x = '15' + 5;
console.log(x);

var fullName = "DO VAN HUNG";

console.log(fullName);
// console.warn(fullName);
// console.error(fullName);

confirm('Xac nhan ban du tuoi');


//Hien hop thoai va co o ipput nhap 
//prompt('Xac nhan ban du tuoi');

//sau 1 giay thi lam viec nhiem vu nao do
setTimeout(function(){
  alert('hien thong bo sau 1s');
},1000);


//sau 1 giay thi lam viec lien tuc 1 nhiem vu nao do
// setInterval(function() {
//    console.log('Day la log'+Math.random());
// },1000)


var firstName = 'Do';
var lastName = 'Hung';
var fullName = firstName+' '+lastName;


document.querySelector('button').onclick = (function(e){
  e.stopPropagation();
  console.log('click button');
});