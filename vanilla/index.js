class TreeNode {
  constructor(id, data) {
    this.id = id;
    this.nombre = data.nombre;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree {
  constructor() {
    this.root = null;
    this.resultArray = []; // Array para almacenar los valores
  }

  insert(id, data) {
    const newNode = new TreeNode(id, data);
    this.root = this._insertNode(this.root, newNode);
  }

  _insertNode(root, newNode) {
    if (!root) {
      return newNode;
    }

    if (newNode.id < root.id) {
      root.left = this._insertNode(root.left, newNode);
    } else {
      root.right = this._insertNode(root.right, newNode);
    }

    return root;
  }

  preOrderTraversal() {
    this.resultArray = []; // Limpiar el array antes de cada recorrido
    this._preOrder(this.root);
    return this.resultArray; // Devolver el array con los valores
  }

  _preOrder(node) {
    if (node) {
      this.resultArray.push({ id: node.id, nombre: node.nombre }); // Guardar el objeto con atributos id y nombre en el array
      this._preOrder(node.left);
      this._preOrder(node.right);
    }
  }

  inOrderTraversal() {
    this.resultArray = []; // Limpiar el array antes de cada recorrido
    this._inOrder(this.root);
    return this.resultArray; // Devolver el array con los valores
  }

  _inOrder(node) {
    if (node) {
      this._inOrder(node.left);
      this.resultArray.push({ id: node.id, nombre: node.nombre }); // Guardar el objeto con atributos id y nombre en el array
      this._inOrder(node.right);
    }
  }

  postOrderTraversal() {
    this.resultArray = []; // Limpiar el array antes de cada recorrido
    this._postOrder(this.root);
    return this.resultArray; // Devolver el array con los valores
  }

  _postOrder(node) {
    if (node) {
      this._postOrder(node.left);
      this._postOrder(node.right);
      this.resultArray.push({ id: node.id, nombre: node.nombre }); // Guardar el objeto con atributos id y nombre en el array
    }
  }
}

const lista = new BinaryTree();
lista.insert(4, { nombre: 'mami' });
lista.insert(1, { nombre: 'Edson Lehi Nataren' });
lista.insert(2, { nombre: 'Hannia Lizeth' });
lista.insert(3, { nombre: 'Emiliano Nataren' });

const preOrderValues = lista.preOrderTraversal();
console.log('Recorrido en preorden:', preOrderValues);

const inOrderValues = lista.inOrderTraversal();
console.log('Recorrido en orden:', inOrderValues);

const postOrderValues = lista.postOrderTraversal();
console.log('Recorrido en posorden:', postOrderValues);


const formulario = document.querySelector('#formulario');
const inputRegistro = document.querySelector('#registro');

let registro;
const tabla = document.querySelector('#tabla');
const tbody = tabla.querySelector('tbody'); // Obtener referencia al tbody

inputRegistro.addEventListener('input', e => {
  registro = e.target.value;
});

formulario.addEventListener('submit', e => {
  e.preventDefault();
  lista.insert(1, registro);
  console.log(lista);
});

lista.map(persona => {
  const row = tbody.insertRow();
  const cell1 = row.insertCell();
  const cell2 = row.insertCell();

  cell2.textContent = persona.nombre;
});
