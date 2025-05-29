function Func() {
  getName = () => console.log(1);
  return this;
}

Func.getName = () => console.log(2);

Func.prototype.getName = () => console.log(3);

var getName = () => console.log(4);

function getName() {
  console.log(5);
}

Func.getName(); // 2
getName(); // 4
Func().getName(); // 1
getName(); // 1
