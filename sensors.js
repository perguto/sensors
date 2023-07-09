const acl = new Accelerometer({ frequency: 60 });
const acl_x_display = document.getElementById('acl_x')
const acl_y_display = document.getElementById('acl_y')
const acl_z_display = document.getElementById('acl_z')
acl.addEventListener("reading", () => {
  console.log(`Acceleration along the X-axis ${acl.x}`);
	const precision = 4
	acl_x_display.textContent = acl.x.toFixed(precision).padStart(3+precision,'0')

  console.log(`Acceleration along the Y-axis ${acl.y}`);
	acl_y_display.textContent = acl.y.toFixed(precision).padStart(3+precision,'0')
  console.log(`Acceleration along the Z-axis ${acl.z}`);
	acl_z_display.textContent = acl.z.toFixed(precision).padStart(3+precision,'0')
});

acl.start();


