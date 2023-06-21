class TreeNode {
  constructor(id, categoria) {
    this.id = id;
    this.categoria = categoria;
    this.left = null;
    this.right = null;
  }
}

export class ArbolBinario {
  constructor() {
    this.root = null;
    this.resultArray = []; // Array para almacenar los valores
  }

  insertar(data) {
    const newNode = new TreeNode(data.id, data.categoria);
    this.root = this._insertarNodo(this.root, newNode);
  }

  _insertarNodo(root, newNode) {
    if (!root) {
      return newNode;
    }
  
    if (newNode.id < root.id) {
      root.left = this._insertarNodo(root.left, newNode);
    } else if (newNode.id > root.id) {
      root.right = this._insertarNodo(root.right, newNode);
    } else {
      // Si el ID ya existe, puedes decidir cómo manejarlo.
      // Por ejemplo, puedes lanzar un error o simplemente ignorar la inserción.
      console.log(`El nodo con ID ${newNode.id} ya existe en el árbol.`);
    }
  
    return root;
  }
  

  obtenerOrdenados() {
    this.resultArray = [];
    this._obtenerElementos(this.root);
    return this.resultArray.sort((a, b) => a.id - b.id);
  }
  

  encontrarNodo(id) {
    return this._encontrarNodo(this.root, id);
  }

  _encontrarNodo(node, id) {
    if (node === null) {
      return null;
    }

    if (id === node.id) {
      return node;
    } else if (id < node.id) {
      return this._encontrarNodo(node.left, id);
    } else {
      return this._encontrarNodo(node.right, id);
    }
  }

  actualizarNodo(data) {
    const nodoActualizar = this.encontrarNodo(data.id);
    if (nodoActualizar) {
      nodoActualizar.categoria = data.categoria;
      // Puedes actualizar otros atributos según sea necesario
    }
  }

  eliminarNodo(id) {
    this.root = this._eliminarNodo(this.root, id);
  }

  _eliminarNodo(node, id) {
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
      const sucesor = this._encontrarNodoMinimo(node.right);
      node.id = sucesor.id;
      node.categoria = sucesor.categoria;
      node.right = this._eliminarNodo(node.right, sucesor.id);
      return node;
    } else if (id < node.id) {
      node.left = this._eliminarNodo(node.left, id);
      return node;
    } else {
      node.right = this._eliminarNodo(node.right, id);
      return node;
    }
  }

  _encontrarNodoMinimo(node) {
    if (node.left === null) {
      return node;
    } else {
      return this._encontrarNodoMinimo(node.left);
    }
  }

  _obtenerElementos(node) {
    if (node) {
      this._obtenerElementos(node.left);
      this.resultArray.push({ id: node.id, categoria: node.categoria });
      this._obtenerElementos(node.right);
    }
  }
}
