const settings = require('electron-settings')
var alpha = document.getElementById('alpha');
var remote = require('electron').remote; 

// Listen for checkbox click
alpha.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        if (event.target.parentElement.classList.contains('beta')) {
            handleSelection(event.target)

        } 
    }
})


document.getElementById("min-btn").addEventListener("click", function (e) {
    console.log('btn clicked!')
    var window = remote.getCurrentWindow();
    window.minimize(); 
});

document.getElementById("exit-btn").addEventListener("click", function (e) {
    console.log('btn clicked!')
    var window = remote.getCurrentWindow();
    window.close();
}); 

function handleSelection(beta) {
    if (beta.checked) {
        // Change section background when selected
        beta.closest('.ui.message').classList.add('selected')
        // Save cuerrent state
        settings.set(beta.id, beta.id)
        console.log(settings.getAll())
    } else {
        // Change background back to default when unselected
        beta.closest('.ui.message').classList.remove('selected')
        // save current state
        settings.delete(beta.id)
        console.log(settings.getAll())
    }
    // Hide input field if hideable
    if (beta.parentElement.classList.contains('omega')) {
        $(beta).parent().next().slideToggle("fast")
    }
    // Disable input field
    $(beta).parent().next().toggleClass('disabled')
}

// Initial view based on last usage
console.log(settings.getAll())
var state = settings.getAll()
for (var i in state) {
    document.getElementById(i).click()
}
