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
  "Search products": "Buscar productos"
};
  const reverse = Object.fromEntries(Object.entries(pairs).map(([en, es]) => [es, en]));
  let language = localStorage.getItem(STORAGE_KEY) === "es" ? "es" : "en";
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
  const localize = (root=document) => { document.documentElement.lang=language; localizeNode(root); document.dispatchEvent(new CustomEvent("marxia:languagechange",{detail:{language}})); };
  const setLanguage = locale => { if (!["en","es"].includes(locale)) return false; language=locale; localStorage.setItem(STORAGE_KEY,locale); localize(); return true; };
  const t = text => translateString(text);
  const observer = new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => { if(node.nodeType===1) localizeNode(node); else if(node.nodeType===3 && node.parentElement) localizeNode(node.parentElement); })));
  window.MarxiaI18n={get language(){return language;},pairs,t,localize,setLanguage};
  const start=()=>{localize();observer.observe(document.body,{childList:true,subtree:true});};
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",start,{once:true}); else start();
})();
