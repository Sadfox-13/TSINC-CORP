
const numeroWhatsApp = '5511999999999';
const checkboxes = document.querySelectorAll('input[name="servico"]');
const listaOrcamento = document.getElementById('lista-orcamento');
const totalEstimadoElemento = document.getElementById('total-estimado');
const finalizarBotao = document.getElementById('finalizar-pedido');


let servicosSelecionados = [];


function calcularOrcamento() {
    servicosSelecionados = [];
    let total = 0;


    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const nome = checkbox.dataset.nome;
            const preco = parseFloat(checkbox.dataset.preco);

            total += preco;


            servicosSelecionados.push({
                nome: nome,
                preco: preco
            });
        }
    });


    atualizarOrcamentoHTML(total);
}




function atualizarOrcamentoHTML(total) {
    listaOrcamento.innerHTML = '';

    if (servicosSelecionados.length === 0) {
        listaOrcamento.innerHTML = '<p>Selecione os serviços no catálogo para calcular.</p>';
        finalizarBotao.disabled = true;
    } else {

        servicosSelecionados.forEach(item => {
            const p = document.createElement('p');

            const precoFormatado = item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            p.textContent = `• ${item.nome} (${precoFormatado})`;
            listaOrcamento.appendChild(p);
        });

        finalizarBotao.disabled = false;
    }


    totalEstimadoElemento.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}



function gerarLinkWhatsApp() {
    let mensagem = 'Olá, TSINC!\n\nEstou interessado nos seguintes serviços:\n';
    let totalOrcamento = 0;


    servicosSelecionados.forEach(item => {
        const precoFormatado = item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        mensagem += `• ${item.nome} (R$ ${precoFormatado})\n`;
        totalOrcamento += item.preco;
    });


    const totalFormatado = totalOrcamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    mensagem += `\n*TOTAL ESTIMADO: R$ ${totalFormatado}*\n`;
    mensagem += '\nGostaria de agendar uma reunião para discutirmos os detalhes.';


    const mensagemCodificada = encodeURIComponent(mensagem);
    const link = `https://wa.me/${5511993100592}?text=${mensagemCodificada}`;


    window.open(link, '_blank');
}




checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', calcularOrcamento);
});


finalizarBotao.addEventListener('click', gerarLinkWhatsApp);


calcularOrcamento();