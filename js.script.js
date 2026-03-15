// Usuários
let usuarioLogado = null;
let usuarios = [
{user:"master",senha:"123",tipo:"master"},
{user:"admin",senha:"123",tipo:"admin"},
{user:"cliente",senha:"123",tipo:"cliente"}
];
let userIPs = [];

// Mostrar seção
function mostrar(id){
  if(id!="login" && !usuarioLogado){alert("Faça login primeiro"); return;}
  document.querySelectorAll(".section").forEach(x=>x.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Login
function login(){
  let u=user.value, s=senha.value;
  let encontrado=usuarios.find(x=>x.user==u && x.senha==s);
  if(!encontrado){status.innerText="Login inválido"; return;}
  usuarioLogado=encontrado;
  status.innerText="Bem-vindo "+u;
  if(encontrado.tipo!="cliente") document.getElementById("menuAdmin").style.display="block";
  mostrar("cliente");

  // Salvar IP (simulado)
  fetch("https://api.ipify.org?format=json")
  .then(r=>r.json())
  .then(d=>{
    if(usuarioLogado.tipo=="master"){
      userIPs.push(u+": "+d.ip);
      document.getElementById("userIPs").innerHTML=userIPs.map(x=>"<li>"+x+"</li>").join("");
    }
  });
}

// Criar usuário
function criarUsuario(){
  if(usuarioLogado.tipo!="master"){alert("Apenas MASTER pode criar usuários"); return;}
  usuarios.push({user:novoUser.value,senha:novaSenha.value,tipo:tipoUser.value});
  alert("Usuário criado");
}

// Resetar senha
function resetarSenha(){
  if(!usuarioLogado){alert("Faça login"); return;}
  let alvo=usuarios.find(x=>x.user==resetUser.value);
  if(!alvo){alert("Usuário não encontrado"); return;}
  if(usuarioLogado.tipo=="admin" && alvo.tipo=="master"){alert("Admin não pode resetar MASTER"); return;}
  if(usuarioLogado.tipo=="cliente"){alert("Cliente não tem acesso"); return;}
  alvo.senha=resetSenha.value;
  alert("Senha alterada");
}

// Deletar usuário
function deletarUsuario(){
  if(usuarioLogado.tipo!="master"){alert("Apenas MASTER pode deletar usuários"); return;}
  let alvo=usuarios.find(x=>x.user==delUser.value);
  if(!alvo){alert("Usuário não encontrado"); return;}
  usuarios = usuarios.filter(x=>x.user!==alvo.user);
  alert("Usuário deletado: "+alvo.user);
}

// Abrir links
function abrir(url){window.open(url)}

// IP
function ip(){fetch("https://api.ipify.org?format=json").then(r=>r.json()).then(d=>{document.getElementById("ip").innerText=d.ip})}

// Calculadora
function calc(op){
  let a=parseFloat(n1.value), b=parseFloat(n2.value);
  if(op==='+') res.innerText=a+b;
  if(op==='-') res.innerText=a-b;
  if(op==='*') res.innerText=a*b;
  if(op==='/') res.innerText=a/b;
}

// Mini navegador
function abrirNav(){iframeNav.src=urlNav.value}

// YouTube MP3
function yt(){
  let link=linkYT.value.trim();
  if(!link){alert("Digite o link"); return;}
  let url="https://ytmp3.nu/"+(link.includes("watch?v=")?link.split("watch?v=")[1]:link);
  ytRes.innerHTML="<a target='_blank' href='"+url+"'>Baixar MP3</a>"
}

// Chat IA básico
let chatHist = [];
function chat(){
  let p=pergunta.value.trim();
  let r="Não entendi.";
  let pl=p.toLowerCase();
  if(pl.includes("oi")||pl.includes("olá")) r="Olá! Como vai?";
  else if(pl.includes("hora")) r="Agora são: "+new Date().toLocaleTimeString();
  else if(pl.includes("data")) r="Hoje é: "+new Date().toLocaleDateString();
  else if(pl.includes("meu nome")) r="Seu nome é "+usuarioLogado.user;
  chatHist.push("<b>Você:</b> "+p);
  chatHist.push("<b>IA:</b> "+r);
  document.getElementById("chatArea").innerHTML=chatHist.join("<br>");
  pergunta.value="";
}

// Matrix animada
let canvas=document.getElementById("matrix"), ctx=canvas.getContext("2d");
canvas.width=window.innerWidth; canvas.height=window.innerHeight;
let letters="0123456789ABCDEF", font=16, columns=Math.floor(canvas.width/font), drops=[];
for(let x=0;x<columns;x++) drops[x]=1;
function draw(){
ctx.fillStyle="rgba(0,0,0,0.05)"; ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fillStyle="#0f0"; ctx.font=font+"px monospace";
for(let i=0;i<drops.length;i++){
ctx.fillText(letters[Math.floor(Math.random()*letters.length)],i*font,drops[i]*font);
drops[i]++;
if(drops[i]*font>canvas.height && Math.random()>0.95) drops[i]=0;
}}
setInterval(draw,50);
