import '@/styles/common.less'
function myAlert (isSuccess, msg) {
  const myAlert = document.querySelector('.alert')
  myAlert.classList.add(isSuccess ? 'alert-success' : 'alter-error')
  myAlert.innerHTML = msg
  console.log(msg)
  myAlert.classList.add('show')

  setTimeout(() => {
    myAlert.classList.remove(isSuccess ? 'alert-success' : 'alter-error')
    myAlert.innerHTML = ''
    myAlert.classList.remove('show')
  }, 2000)
}

export default myAlert
