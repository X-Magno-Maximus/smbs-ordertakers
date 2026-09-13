"use strict";
(() => {
  const STORAGE_KEY = "marxia-language";
  const supported = new Set(["en", "es"]);
  const es = {"SMBs Staff Orders":"Pedidos del personal de PYMES","Marxia · Staff access":"Marxia · Acceso del personal","SMB Order Station":"Estación de pedidos de la PYME","Authorized staff only.":"Solo personal autorizado.","Access requires active consent from the SMB owner and verified staff authentication.":"El acceso requiere el consentimiento vigente del propietario de la PYME y la autenticación verificada del personal.","Staff email":"Correo del personal","Authorization code":"Código de autorización","Owner-issued code":"Código emitido por el propietario","I confirm I am authorized by this SMB owner to create orders and handle customer contact details.":"Confirmo que el propietario de esta PYME me autorizó a crear pedidos y gestionar los datos de contacto de clientes.","Verify and open order station":"Verificar y abrir la estación de pedidos","Deny-by-default access · Session and order actions prepared for audit logging":"Acceso denegado por defecto · Acciones de sesión y pedidos preparadas para el registro de auditoría","Product selection":"Selección de productos","Order menu":"Menú de pedidos","Order":"Pedido","Soft drinks":"Bebidas gaseosas","Coffee":"Café","Control placement":"Ubicación de controles","Place controls on the left":"Colocar los controles a la izquierda","Place controls on the right":"Colocar los controles a la derecha","Left-handed":"Para zurdos","Right-handed":"Para diestros","Lock staff session":"Bloquear sesión del personal","Toggle order menu":"Alternar menú de pedidos","Open order menu":"Abrir menú de pedidos","Open current order":"Abrir pedido actual","Open current order, {{count}} items":"Abrir pedido actual, {{count}} artículos","Soft drink":"Bebida gaseosa","Milk":"Leche","24 available":"24 disponibles","Swipe left or right":"Desliza a la izquierda o derecha","Quantity controls":"Controles de cantidad","Add one {{name}}":"Agregar una unidad de {{name}}","Remove one {{name}}":"Quitar una unidad de {{name}}","Other products":"Otros productos","Previous product":"Producto anterior","Next product":"Producto siguiente","Select {{name}}":"Seleccionar {{name}}","Order station active":"Estación de pedidos activa","Authorized staff session":"Sesión autorizada del personal","Current order":"Pedido actual","Close current order":"Cerrar pedido actual","Use + to add a product.":"Usa + para agregar un producto.","Add Client":"Agregar cliente","+ Add Client":"+ Agregar cliente","Client name":"Nombre del cliente","Consumer email":"Correo del consumidor","Consumer WhatsApp":"WhatsApp del consumidor","Optional":"Opcional","Save consumer details":"Guardar datos del consumidor","VAT %":"IVA %","Reference":"Referencia","Subtotal":"Subtotal","VAT":"IVA","Lock VAT for new orders":"Bloquear IVA para pedidos nuevos","Unlock VAT ({{rate}}%)":"Desbloquear IVA ({{rate}}%)","Save & New Order":"Guardar y crear pedido","Add more items":"Agregar más artículos","Pending orders":"Pedidos pendientes","Saved unpaid orders":"Pedidos no pagados guardados","Total":"Total","Review order":"Revisar pedido","Paid":"Pagado","Paid records staff confirmation on this device; it does not charge a payment method.":"Pagado registra la confirmación del personal en este dispositivo; no realiza ningún cobro.","Remove":"Quitar","Remove {{name}}":"Quitar {{name}}","Authorization and consent are required.":"Se requieren autorización y consentimiento.","No pending orders.":"No hay pedidos pendientes.","Pending orders saved on this device.":"Pedidos pendientes guardados en este dispositivo.","Saved orders could not be restored; stored data has been preserved.":"No se pudieron restaurar los pedidos; los datos almacenados se conservaron.","Order changed in another tab. Reload to use the latest saved order.":"El pedido cambió en otra pestaña. Recarga para usar la versión guardada más reciente.","Reference {{reference}}":"Referencia {{reference}}","not entered":"sin ingresar","available":"disponibles","Order #":"Pedido n.º ","Order reviewed":"Pedido revisado","Mark as paid":"Marcar como pagado","Cancel":"Cancelar","Close":"Cerrar","Customer details saved.":"Datos del cliente guardados.","VAT locked for new orders.":"IVA bloqueado para pedidos nuevos.","VAT unlocked.":"IVA desbloqueado.","Order marked paid and removed from pending orders.":"Pedido marcado como pagado y eliminado de los pedidos pendientes.","New pending order created.":"Se creó un nuevo pedido pendiente.","Nothing to save yet.":"Aún no hay nada que guardar.","Go back":"Volver","Language":"Idioma","English":"Inglés","Spanish":"Español"};

  const originals = new WeakMap();
  const attributeNames = ["placeholder", "title", "aria-label"];
  let language = supported.has(localStorage.getItem(STORAGE_KEY)) ? localStorage.getItem(STORAGE_KEY) : "en";

  function interpolate(value, params = {}) {
    return Object.entries(params).reduce((result, [key, entry]) => result.replaceAll(`{{${key}}}`, String(entry)), value);
  }
  function t(key, params) {
    const source = language === "es" ? (es[key] || key) : key;
    return interpolate(source, params);
  }
  function translateDynamic(value) {
    if (language !== "es") return value;
    if (es[value]) return es[value];
    let match = value.match(/^(\d+) available$/);
    if (match) return `${match[1]} disponibles`;
    match = value.match(/^Open current order, (\d+) items$/);
    if (match) return t("Open current order, {{count}} items", { count: match[1] });
    match = value.match(/^Add one (.+)$/);
    if (match) return t("Add one {{name}}", { name: match[1] });
    match = value.match(/^Remove one (.+)$/);
    if (match) return t("Remove one {{name}}", { name: match[1] });
    match = value.match(/^Select (.+)$/);
    if (match) return t("Select {{name}}", { name: match[1] });
    match = value.match(/^Remove (.+)$/);
    if (match) return t("Remove {{name}}", { name: match[1] });
    match = value.match(/^Unlock VAT \((.+)%\)$/);
    if (match) return t("Unlock VAT ({{rate}}%)", { rate: match[1] });
    return value.replace(/\bReference\b/g, "Referencia").replace(/\bnot entered\b/g, "sin ingresar");
  }
  function localize(root = document) {
    document.documentElement.lang = language;
    const scope = root.nodeType === 9 ? root.body : root;
    if (!scope) return;
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (node.parentElement && ["SCRIPT", "STYLE", "NOSCRIPT"].includes(node.parentElement.tagName)) return;
      if (!originals.has(node)) originals.set(node, node.nodeValue);
      const original = originals.get(node);
      const trimmed = original.trim();
      if (!trimmed) return;
      const leading = original.match(/^\s*/)[0];
      const trailing = original.match(/\s*$/)[0];
      node.nodeValue = language === "es" ? leading + translateDynamic(trimmed) + trailing : original;
    });
    const elements = scope.nodeType === 1 ? [scope, ...scope.querySelectorAll("*")] : [...document.querySelectorAll("*")];
    elements.forEach(element => attributeNames.forEach(name => {
      if (!element.hasAttribute(name)) return;
      const dataKey = "i18nOriginal" + name.replace(/[^a-z]/gi, "");
      if (!element.dataset[dataKey]) element.dataset[dataKey] = element.getAttribute(name);
      const original = element.dataset[dataKey];
      element.setAttribute(name, language === "es" ? translateDynamic(original) : original);
    }));
    document.querySelectorAll("[data-language]").forEach(button => {
      const active = button.dataset.language === language;
      button.setAttribute("aria-pressed", String(active));
      button.classList.toggle("active", active);
    });
    document.dispatchEvent(new CustomEvent("marxia:languagechange", { detail: { language } }));
  }
  function setLanguage(locale) {
    if (!supported.has(locale)) return false;
    language = locale;
    localStorage.setItem(STORAGE_KEY, locale);
    localize();
    return true;
  }
  let observing = false;
  function observe() {
    if (observing) return;
    observing = true;
    new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === 1) localize(node);
        else if (node.nodeType === 3 && node.parentElement) localize(node.parentElement);
      }));
    }).observe(document.body, { childList: true, subtree: true });
  }
  document.addEventListener("click", event => {
   const button = event.target.closest("[data-language]");
    if (button) setLanguage(button.dataset.language);
  });
  window.MarxiaI18n = { get language() { return language; }, t, localize, setLanguage };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => { localize(); observe(); }, { once: true });
  } else {
    localize(); observe();
  }
})();