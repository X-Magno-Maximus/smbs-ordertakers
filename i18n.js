"use strict";
(() => {
  const STORAGE_KEY = "marxia-language";
  const pairs = {
  "Staff access": "Acceso del personal",
  "My Access": "Mi acceso",
  "Sign in": "Iniciar sesión",
  "Staff email": "Correo del personal",
  "Authorization code": "Código de autorización",
  "Enter your staff email": "Ingresa tu correo del personal",
  "Enter authorization code": "Ingresa el código de autorización",
  "I confirm that I am authorized by the business owner.": "Confirmo que cuento con la autorización del propietario del negocio.",
  "Authorization and consent are required.": "Se requieren autorización y consentimiento.",
  "Order station": "Estación de pedidos",
  "Current order": "Pedido actual",
  "Pending orders": "Pedidos pendientes",
  "No pending orders.": "No hay pedidos pendientes.",
  "New order": "Nuevo pedido",
  "Add more items": "Agregar más productos",
  "Review order": "Revisar pedido",
  "Paid": "Pagado",
  "Mark paid": "Marcar como pagado",
  "Confirm paid": "Confirmar pago",
  "Confirm payment received": "Confirmar pago recibido",
  "Confirm only after payment has been received.": "Confirma únicamente después de haber recibido el pago.",
  "Keep unpaid order": "Mantener pedido pendiente",
  "Go back": "Volver",
  "Reference": "Referencia",
  "Reference number": "Número de referencia",
  "not entered": "sin ingresar",
  "Order #": "Pedido #",
  "Subtotal": "Subtotal",
  "VAT": "IVA",
  "Total": "Total",
  "VAT %": "IVA %",
  "Lock VAT for new orders": "Bloquear IVA para pedidos nuevos",
  "Unlock VAT": "Desbloquear IVA",
  "Enter a valid VAT percentage first": "Ingresa primero un porcentaje de IVA válido",
  "+ Add Client": "+ Agregar cliente",
  "Client name": "Nombre del cliente",
  "Consumer email": "Correo del consumidor",
  "WhatsApp": "WhatsApp",
  "Save contact": "Guardar contacto",
  "Client saved to this order": "Cliente guardado en este pedido",
  "Products": "Productos",
  "All products": "Todos los productos",
  "Soft drinks": "Bebidas gaseosas",
  "Coffee": "Café",
  "Milk": "Leche",
  "Add": "Agregar",
  "Remove": "Eliminar",
  "Quantity": "Cantidad",
  "Previous product": "Producto anterior",
  "Next product": "Producto siguiente",
  "Add products before starting another order": "Agrega productos antes de iniciar otro pedido",
  "Pending orders saved on this device.": "Los pedidos pendientes se guardaron en este dispositivo.",
  "Orders changed in another tab. Reload before continuing.": "Los pedidos cambiaron en otra pestaña. Recarga antes de continuar.",
  "Storage unavailable. Keep this page open; changes are not saved.": "El almacenamiento no está disponible. Mantén esta página abierta; los cambios no se guardarán.",
  "Saved orders could not be restored; stored data has been preserved.": "No se pudieron restaurar los pedidos guardados; los datos almacenados se conservaron.",
  "marked paid and removed. Other pending orders retained.": "se marcó como pagado y se eliminó. Los demás pedidos pendientes se conservaron.",
  "Order changed in another tab. Reload to use the latest saved order.": "El pedido cambió en otra pestaña. Recarga para usar la versión guardada más reciente.",
  "Control placement": "Ubicación de controles",
  "Right-handed": "Para diestros",
  "Left-handed": "Para zurdos",
  "Control placement changed for this visit; browser storage is unavailable": "La ubicación de los controles cambió durante esta visita; el almacenamiento del navegador no está disponible",
  "Lock session": "Bloquear sesión",
  "Log out": "Cerrar sesión",
  "Menu": "Menú",
  "Close": "Cerrar",
  "Search products": "Buscar productos",
  "SMBs Staff Orders": "Pedidos del personal de negocios",
  "SMB Order Station": "Estación de pedidos del negocio",
  "Marxia · Staff access": "Marxia · Acceso del personal",
  "Authorized staff only.": "Solo personal autorizado.",
  "Access requires active consent from the SMB owner and verified staff authentication.": "El acceso requiere el consentimiento activo del propietario del negocio y la autenticación verificada del personal.",
  "I confirm I am authorized by this SMB owner to create orders and handle customer contact details.": "Confirmo que el propietario de este negocio me autorizó para crear pedidos y gestionar los datos de contacto de los clientes.",
  "Verify and open order station": "Verificar y abrir la estación de pedidos",
  "Deny-by-default access · Session and order actions prepared for audit logging": "Acceso denegado de forma predeterminada · Las acciones de sesión y pedidos están preparadas para el registro de auditoría",
  "Owner-issued code": "Código emitido por el propietario",
  "Lock staff session": "Bloquear sesión del personal",
  "Product selection": "Selección de productos",
  "Order menu": "Menú de pedidos",
  "Order": "Pedido",
  "Soft drink": "Bebida gaseosa",
  "Sparkling Cola": "Cola con gas",
  "Orange Soda": "Gaseosa de naranja",
  "Café Latte": "Café latte",
  "Double Espresso": "Espresso doble",
  "Fresh Milk": "Leche fresca",
  "available": "disponibles",
  "Swipe left or right": "Desliza a la izquierda o a la derecha",
  "Quantity controls": "Controles de cantidad",
  "Place controls on the left": "Colocar los controles a la izquierda",
  "Place controls on the right": "Colocar los controles a la derecha",
  "Toggle order menu": "Alternar menú de pedidos",
  "Open order menu": "Abrir menú de pedidos",
  "Open current order": "Abrir pedido actual",
  "Close current order": "Cerrar pedido actual",
  "Add one": "Agregar uno de",
  "Remove one": "Quitar uno de",
  "Select": "Seleccionar",
  "Other products": "Otros productos",
  "Authorized staff session": "Sesión de personal autorizado",
  "Order station active": "Estación de pedidos activa",
  "Use + to add a product.": "Usa + para agregar un producto.",
  "Optional": "Opcional",
  "Consumer WhatsApp": "WhatsApp del consumidor",
  "Save consumer details": "Guardar datos del consumidor",
  "Save & New Order": "Guardar e iniciar nuevo pedido",
  "Saved unpaid orders": "Pedidos pendientes guardados",
  "Paid records staff confirmation on this device; it does not charge a payment method.": "Pagado registra la confirmación del personal en este dispositivo; no realiza cargos a ningún método de pago.",
  "Review current order": "Revisar pedido actual",
  "Remove": "Quitar",
  "items": "artículos",
  "item": "artículo",
  "Select English": "Seleccionar inglés",
  "Select Spanish": "Seleccionar español",
  "English": "Inglés",
  "Spanish": "Español",
  "Language": "Idioma",
  "Current language": "Idioma actual"
};
  const reverse = Object.fromEntries(Object.entries(pairs).map(([en, es]) => [es, en]));
  let storedLanguage; try { storedLanguage=localStorage.getItem(STORAGE_KEY); } catch {};
  let language = storedLanguage === "es" ? "es" : "en";
  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();
  const translateString = (value, locale = language) => {
    if (!value) return value;
    const source = locale === "es" ? pairs : reverse;
    if (source[value.trim()]) {
      const lead = value.match(/^\s*/)[0], trail = value.match(/\s*$/)[0];
      return lead + source[value.trim()] + trail;
    }
    let result = value;
    Object.keys(source).sort((a,b)=>b.length-a.length).forEach(key => { result = result.split(key).join(source[key]); });
    return result;
  };
  const localizeNode = root => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (!node.nodeValue.trim() || ["SCRIPT","STYLE"].includes(node.parentElement?.tagName)) return;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      node.nodeValue = translateString(originalText.get(node));
    });
    const elements = root.querySelectorAll ? [root, ...root.querySelectorAll("[placeholder],[aria-label],[title],input[type=button],input[type=submit]")] : [];
    elements.forEach(el => {
      if (!(el instanceof Element)) return;
      if (!originalAttrs.has(el)) {
        const data = {};
        ["placeholder","aria-label","title","value"].forEach(name => { if (el.hasAttribute(name)) data[name] = el.getAttribute(name); });
        originalAttrs.set(el, data);
      }
      Object.entries(originalAttrs.get(el)).forEach(([name,value]) => el.setAttribute(name, translateString(value)));
    });
  };
  const localize = (root=document) => { document.documentElement.lang=language; localizeNode(root); document.title=translateString("SMBs Staff Orders"); document.dispatchEvent(new CustomEvent("marxia:languagechange",{detail:{language}})); };
  const setLanguage = locale => { if (!["en","es"].includes(locale)) return false; language=locale; try { localStorage.setItem(STORAGE_KEY,locale); } catch {} localize(); return true; };
  const t = text => translateString(text);
  const observer = new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => { if(node.nodeType===1) localizeNode(node); else if(node.nodeType===3 && node.parentElement) localizeNode(node.parentElement); })));
  window.MarxiaI18n={get language(){return language;},pairs,t,localize,setLanguage};
  const start=()=>{localize();observer.observe(document.body,{childList:true,subtree:true});};
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",start,{once:true}); else start();
})();
