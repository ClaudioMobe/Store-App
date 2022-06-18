import React, {useState} from 'react';
import { Route, NavLink, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Inicio from './components/Inicio';
import Blog from './components/Blog';
import Tienda from './components/Tienda';
import Carrito from './components/Carrito';
import Error404 from './components/Error404';


const App = () => {
  const productos = [
    {id: 1, nombre: 'Producto 1'},
    {id: 2, nombre: 'Producto 2'},
    {id: 3, nombre: 'Producto 3'},
    {id: 4, nombre: 'Producto 4'}
  ];

  const [carrito, cambiarCarrito] = useState([]);

  const agregarProductoAlCarrito = (idProductoAAgregar, nombreProductoAAgregar) =>{
    //Si el carrito no tiene elementos, añadimos uno
    if (carrito.length === 0){
      cambiarCarrito([{id:idProductoAAgregar, nombre: nombreProductoAAgregar, cantidad: 1}]);
    } else{
      //Si el carrito ya tiene elementos, debemos revisar si el producto ya está
      //Si ya está, modificamos sólo la cantidad; si no está, lo agregamos
      
      //Para editar el arreglo debemos clonarlo:
      const nuevoCarrito = [...carrito];

      //Comprobamos si el carrito ya tiene el ID del producto a agregar
      const yaEstaEnCarrito = nuevoCarrito.filter((productoDeCarrito)=>{
          return productoDeCarrito.id === idProductoAAgregar //regresa los productos que cumplan esta condición en un ARREGLO
      }).length > 0; //Verificamos que el ARREGLO que nos regresó tiene UN elemeto. Si tiene un elemento, es el que corresponde al ID del que se quiere agregar, por lo que ya está en el carrito
      
      //Si ya tiene el producto, entonces debemos actualizarlo
      //Para hacerlo, debemos conocer qué objeto del carrito es, es decir, su posición
      if(yaEstaEnCarrito){
        nuevoCarrito.forEach((productoDeCarrito, index)=>{ //forEach nos permite ejecutar una función en cada elemento de un arreglo
          if(productoDeCarrito.id===idProductoAAgregar){
            const cantidad = nuevoCarrito[index].cantidad;
            nuevoCarrito[index]= {id: idProductoAAgregar, nombre: nombreProductoAAgregar, cantidad: cantidad +1};
            //nuevoCarrito[index].cantidad= cantidad +1;    LO MISMO
          }
        })
      } else {
        nuevoCarrito.push({id: idProductoAAgregar, nombre: nombreProductoAAgregar, cantidad: 1}); //push añade un elemento al final de un arreglo
      }
      cambiarCarrito(nuevoCarrito);
    }
  }

  return (
    <Contenedor>
      <Menu>
        <NavLink to={'/'}>Inicio</NavLink>
        <NavLink to={'/blog'}>Blog</NavLink>
        <NavLink to={'/tienda'}>Tienda</NavLink>
      </Menu>
      <main>
        <Routes>
          <Route path='/' element={<Inicio/>} />
          <Route path='/blog' element={<Blog/>} />
          <Route path='/tienda' element={<Tienda productos={productos} agregarProductoAlCarrito={agregarProductoAlCarrito}/>} />
          <Route path='*' element={<Error404/>} />
        </Routes>
      </main>
      <aside>
        <Carrito carrito={carrito}/>
      </aside>
    </Contenedor>
  );
}

const Contenedor = styled.div`
    max-width: 1000px;
    padding: 40px;
    width: 90%;
    display: grid;
    gap: 20px;
    grid-template-columns: 2fr 1fr;
    background: #fff;
    margin: 40px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;
 
const Menu = styled.nav`
    width: 100%;
    text-align: center;
    background: #092c4c;
    grid-column: span 2;
    border-radius: 3px;
 
    a {
        color: #fff;
        display: inline-block;
        padding: 15px 20px;
    }
 
    a:hover {
        background: #1d85e8;
        text-decoration: none;
    }
    a.active {
      border-top: 3px solid #1d85e8;
      border-bottom: 3px solid #1d85e8;
    }
`;

export default App;