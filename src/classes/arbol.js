
class TreeNode {
  constructor(id, data) {
    this.id = id;
    this.categoria = data.categoria;
    this.left = null;
    this.right = null;
  }
}


export class BinaryTree {
  // static establecerRegistros(registros) {
  //   BinaryTree.registros = registros;
  // }
  
  constructor() {
    this.root = null;
    this.resultArray = []; // Array para almacenar los valores
  }

  insert(id, data) {
    const newNode = new TreeNode(id, data);
    this.root = this._insertNode(this.root, newNode);
    // BinaryTree.establecerRegistros(prevRegistros => [...prevRegistros, data]);
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
      this.resultArray.push({ id: node.id, categoria: node.categoria }); // Guardar el objeto con atributos id y nombre en el array
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
      this.resultArray.push({ id: node.id, categoria: node.categoria }); // Guardar el objeto con atributos id y nombre en el array
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
      this.resultArray.push({ id: node.id, categoria: node.categoria }); // Guardar el objeto con atributos id y nombre en el array
    }
  }

    findNode(id) {
      return this._findNode(this.root, id);
    }
  
    _findNode(node, id) {
      if (node === null) {
        return null;
      }
  
      if (id === node.id) {
        return node;
      } else if (id < node.id) {
        return this._findNode(node.left, id);
      } else {
        return this._findNode(node.right, id);
      }
    }
  
    updateNode(id, newData) {
      const nodeToUpdate = this.findNode(id);
      if (nodeToUpdate) {
        nodeToUpdate.categoria = newData.categoria;
        // Puedes actualizar otros atributos según sea necesario
      }
    }
  
    deleteNode(id) {
      this.root = this._deleteNode(this.root, id);
    }
  
    _deleteNode(node, id) {
      if (node === null) {
        return null;
      }
  
      if (id === node.id) {
        // Caso 1: El nodo a eliminar es una hoja
        if (node.left === null && node.right === null) {
          return null;
        }
        // Caso 2: El nodo a eliminar tiene solo un hijo
        if (node.left === null) {
          return node.right;
        }
        if (node.right === null) {
          return node.left;
        }
        // Caso 3: El nodo a eliminar tiene dos hijos
        const successor = this._findMinNode(node.right);
        node.id = successor.id;
        node.categoria = successor.categoria;
        node.right = this._deleteNode(node.right, successor.id);
        return node;
      } else if (id < node.id) {
        node.left = this._deleteNode(node.left, id);
        return node;
      } else {
        node.right = this._deleteNode(node.right, id);
        return node;
      }
    }
  
    _findMinNode(node) {
      if (node.left === null) {
        return node;
      } else {
        return this._findMinNode(node.left);
      }
    }
    getTreeElements() {
      this.resultArray = [];
      this._getElements(this.root);
      return this.resultArray;
    }
  
    _getElements(node) {
      if (node) {
        this._getElements(node.left);
        this.resultArray.push({ id: node.id, categoria: node.categoria });
        this._getElements(node.right);
      }
    }
  

  
}
