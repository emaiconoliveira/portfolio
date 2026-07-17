@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700;900&display=swap');

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Montserrat',sans-serif;
}

html{
scroll-behavior:smooth;
}

body{
background:#0d0d0d;
color:white;
display:flex;
overflow-x:hidden;
}

.sidebar{
width:260px;
height:100vh;
position:fixed;
background:#111;
padding:40px;
border-right:1px solid #222;
}

.sidebar h1{
font-size:2.2rem;
margin-bottom:60px;
color:#f5d000;
font-weight:900;
}

.sidebar nav{
display:flex;
flex-direction:column;
gap:20px;
}

.sidebar a{
color:white;
text-decoration:none;
transition:.3s;
}

.sidebar a:hover{
color:#b84cff;
}

main{
margin-left:260px;
width:100%;
}

section{
padding:100px;
min-height:100vh;
}

.hero{
display:flex;
align-items:center;
position:relative;
overflow:hidden;
}

.hero::before{
content:"";
position:absolute;
width:600px;
height:600px;
background:#8b5cf6;
border-radius:50%;
filter:blur(250px);
opacity:.15;
top:-200px;
right:-200px;
}

.hero-text{
position:relative;
z-index:2;
max-width:900px;
}

.hero span{
color:#b84cff;
letter-spacing:2px;
}

.hero h2{
font-size:7rem;
font-weight:900;
line-height:.9;
margin:20px 0;
}

.hero h3{
font-size:5rem;
font-style:italic;
color:#f5d000;
}

.hero p{
margin-top:20px;
font-size:1.2rem;
max-width:600px;
color:#c5c5c5;
}

.hero-buttons{
display:flex;
gap:20px;
margin-top:40px;
}

.btn-primary,
.btn-secondary{
padding:15px 30px;
border-radius:10px;
text-decoration:none;
transition:.3s;
}

.btn-primary{
background:#8b5cf6;
color:white;
}

.btn-primary:hover{
transform:translateY(-5px);
}

.btn-secondary{
border:1px solid #8b5cf6;
color:white;
}

.cards{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:20px;
margin-top:30px;
}

.card{
background:#171717;
padding:30px;
border-radius:15px;
transition:.4s;
}

.card:hover{
transform:translateY(-10px);
box-shadow:0 0 25px #8b5cf6;
}

.skills-grid{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:15px;
margin-top:30px;
}

.skills-grid span{
background:#171717;
padding:20px;
border-radius:10px;
text-align:center;
transition:.3s;
}

.skills-grid span:hover{
background:#8b5cf6;
}

.hidden{
opacity:0;
transform:translateY(50px);
transition:1s;
}

.show{
opacity:1;
transform:translateY(0);
}

a{
color:#8b5cf6;
}

@media(max-width:900px){

.sidebar{
display:none;
}

main{
margin-left:0;
}

.hero h2{
font-size:4rem;
}

.hero h3{
font-size:3rem;
}

.skills-grid{
grid-template-columns:repeat(2,1fr);
}

section{
padding:50px 25px;
}

}
