const telefoneInput = document.getElementById("telefone");

  telefoneInput.addEventListener("input", function () {
    let valor = telefoneInput.value.replace(/\D/g, "");

    if (valor.length > 11) {
      valor = valor.slice(0, 11);
    }

    let formatado = valor;

    if (valor.length > 0) {
      formatado = "(" + valor.slice(0, 2);
    }
    if (valor.length >= 3) {
      formatado += ") " + valor.slice(2, 7);
    }
    if (valor.length >= 8) {
      formatado += "-" + valor.slice(7);
    }

    telefoneInput.value = formatado;
  });

const selectCriancas = document.getElementById("criancas");
const detalhesCriancasContainer = document.getElementById("criancas_detalhes_container");
const detalhesCriancas = document.getElementById("criancas_detalhes");

detalhesCriancasContainer.style.display = "none";

selectCriancas.addEventListener("change", function () {
  if (this.value === "Sim") {
    detalhesCriancasContainer.style.display = "block";
    detalhesCriancas.required = true;
  } else {
    detalhesCriancasContainer.style.display = "none";
    detalhesCriancas.required = false;
    detalhesCriancas.value = "";
  }
});

const selectAnimais = document.getElementById("animais");
const infoExtras = document.getElementById("infoAnimaisExtras");
const inputDataVacina = document.getElementById("data_vacina");
const inputDetalhes = document.getElementById("detalhes_animais");

// Máscara para data
const mask = IMask(inputDataVacina, {
  mask: '00/00/0000'
});

// Exibir campos extras somente se "Sim"
selectAnimais.addEventListener("change", function () {
  if (this.value === "Sim") {
    infoExtras.style.display = "block";
    inputDataVacina.required = false;
    inputDetalhes.required = true;
  } else {
    infoExtras.style.display = "none";
    inputDataVacina.required = false;
    inputDetalhes.required = false;
    inputDataVacina.value = "";
    inputDetalhes.value = "";
  }
});

// Questão 12
const selectMudanca = document.getElementById("mudanca");
const textareaOutroMudanca = document.getElementById("mudanca_outro");

  selectMudanca.addEventListener("change", function () {
    if (this.value === "Outra") {
      textareaOutroMudanca.style.display = "block";
      textareaOutroMudanca.required = true;
    } else {
      textareaOutroMudanca.style.display = "none";
      textareaOutroMudanca.required = false;
      textareaOutroMudanca.value = "";
    }
  });

const selectMordida = document.getElementById("mordida");
const textareaOutro = document.getElementById("mordida_outro");

  textareaOutro.style.display = "none";

  selectMordida.addEventListener("change", function () {
    if (this.value === "Outra") {
      textareaOutro.style.display = "block";
      textareaOutro.required = true;
    } else {
      textareaOutro.style.display = "none";
      textareaOutro.required = false;
      textareaOutro.value = "";
    }
  });

document.getElementById('form-adocao').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    fetch('processa_formulario.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(resposta => {
        if (resposta.includes('sucesso')) {
            Swal.fire({
                title: 'Tudo certo!',
                text: 'Sua mensagem foi enviada com sucesso.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            form.reset();
        } else {
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu um erro ao enviar o formulário. Tente novamente.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    })
    .catch(error => {
        Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível enviar o formulário.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });
});