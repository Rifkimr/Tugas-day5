function submitData() {
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let phone = document.getElementById("input-phone").value;
  let subject = document.getElementById("input-subject").value;
  let message = document.getElementById("input-message").value;

  if (name == "") {
      return alert("Nama harus di isi");
  } else if (email == "") {
      return alert("Email harus diisi!");
  } else if (phone == "") {
      return alert("Phone harus diisi!");
  } else if (subject == "") {
      return alert("Subject harus dipilih!");
  } else if (message == "") {
      return alert("Message Wajib diisi");
  }

//untuk mengirimkan data ke email
// nama tagnya  (emailReceiver) dan harus membuat eleman baru di Js dengan coment (a) atau angker sepeti conto di bawah

  let emailReceiver = "reefqe774@gmail.com";

  let a = document.createElement("a");
  a.href = `mailto: ${emailReceiver}?subject=${subject}&body=Halo, nama saya ${name}, ${message}. Silahkan kontak saya di nomor ${phone}, terimakasih.`
  a.click()

  console.log(name);
  console.log(email);
  console.log(phone);
  console.log(subject);
  console.log(message);

}

//   let emailer = {
//       name,
//       email,
//       phone,
//       subject,
//       message
//   };

//   console.log(emailer);
// }