const acl = new Accelerometer({ frequency: 60 });
const acl_x_display = document.getElementById('acl_x')
const acl_y_display = document.getElementById('acl_y')
const acl_z_display = document.getElementById('acl_z')
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
context.fillstyle = '#f00'
context.fil

acl.addEventListener("reading", () => {
  console.log(`Acceleration along the X-axis ${acl.x}`);
	const precision = 4
	const x= acl.x ?? Math.cos(performance.now()/1000)
	const y= acl.y ?? Math.sin(performance.now()/1000)
	const z= acl.z
	acl_x_display.textContent = 
	x.toFixed(precision).padStart(4+precision,'0')

  console.log(`Acceleration along the Y-axis ${acl.y}`);
	acl_y_display.textContent = y.toFixed(precision).padStart(4+precision,'0')
  console.log(`Acceleration along the Z-axis ${acl.z}`);
	acl_z_display.textContent = z.toFixed(precision).padStart(4+precision,'0')
	const fillWidth = 10
	const fillHeight = 10
	const offset_x = canvas.width/2
	const offset_y = canvas.height/2
	context.fillRect(x + offset_x, y +offset_y,fillWidth,fillHeight)
});

acl.start();


