gsap.from("header", {
  duration: 3,        
  y: -200,            
  ease: "bounce.out", 
  opacity: 0          
});

gsap.from("button",{
  x:200,
  duration:5,
  opacity:0,
});
