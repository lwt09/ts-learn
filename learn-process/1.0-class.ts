class Base {
  print() {
    console.log(1);
  }
}

class derive extends Base {
  override print(): void {
    console.log(2);
  }
}

const baseInstance = new Base();
const deriveInstance = new derive();

baseInstance.print();
deriveInstance.print();
