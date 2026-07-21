
const btn=document.getElementById('translateBtn');
let en=false;
btn.onclick=()=>{
en=!en;
if(en){
document.querySelector('.hero h1').textContent='Creating digital experiences';
document.querySelector('.hero p').textContent='Cloud Computing • DevOps • Automation • Web Development';
btn.textContent='PT';
}else{
document.querySelector('.hero h1').textContent='Criando experiências digitais';
document.querySelector('.hero p').textContent='Cloud Computing • DevOps • Automação • Desenvolvimento Web';
btn.textContent='EN';
}
};
