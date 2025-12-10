// Seu número de telefone (com código do país e DDD, sem espaços ou traços)
const numeroWhatsApp = '5511999999999'; // **SUBSTITUA PELO SEU NÚMERO**

const checkboxes = document.querySelectorAll('input[name="servico"]');
const listaOrcamento = document.getElementById('lista-orcamento');
const totalEstimadoElemento = document.getElementById('total-estimado');
const finalizarBotao = document.getElementById('finalizar-pedido');

// Array para armazenar os serviços selecionados
let servicosSelecionados = [];

// ####################################
// FUNÇÃO PRINCIPAL: CALCULA E ATUALIZA
// ####################################
function calcularOrcamento() {
    servicosSelecionados = []; // Limpa o array
    let total = 0;
    
    // 1. Itera sobre todos os checkboxes do catálogo
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const nome = checkbox.dataset.nome;
            const preco = parseFloat(checkbox.dataset.preco);

            total += preco;
            
            // Adiciona o item formatado ao array
            servicosSelecionados.push({
                nome: nome,
                preco: preco
            });
        }
    });

    // 2. Atualiza a lista e o total na interface
    atualizarOrcamentoHTML(total);
}


// ####################################
// ATUALIZA O HTML DO ORÇAMENTO
// ####################################
function atualizarOrcamentoHTML(total) {
    listaOrcamento.innerHTML = ''; 

    if (servicosSelecionados.length === 0) {
        listaOrcamento.innerHTML = '<p>Selecione os serviços no catálogo para calcular.</p>';
        finalizarBotao.disabled = true;
    } else {
        // Gera a lista de itens
        servicosSelecionados.forEach(item => {
            const p = document.createElement('p');
            // Formata o preço para R$ 0.000,00
            const precoFormatado = item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            p.textContent = `• ${item.nome} (${precoFormatado})`;
            listaOrcamento.appendChild(p);
        });
        
        finalizarBotao.disabled = false;
    }

    // Formata o total final
    totalEstimadoElemento.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


// ####################################
// GERA O LINK DO WHATSAPP
// ####################################
function gerarLinkWhatsApp() {
    let mensagem = 'Olá, TSINC!\n\nEstou interessado nos seguintes serviços:\n';
    let totalOrcamento = 0;
    
    // 1. Constrói a lista de serviços para a mensagem
    servicosSelecionados.forEach(item => {
        const precoFormatado = item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        mensagem += `• ${item.nome} (R$ ${precoFormatado})\n`;
        totalOrcamento += item.preco;
    });

    // 2. Adiciona o total
    const totalFormatado = totalOrcamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    mensagem += `\n*TOTAL ESTIMADO: R$ ${totalFormatado}*\n`;
    mensagem += '\nGostaria de agendar uma reunião para discutirmos os detalhes.';

    // 3. Codifica e cria o link final
    const mensagemCodificada = encodeURIComponent(mensagem);
    const link = `https://wa.me/${5511993100592}?text=${mensagemCodificada}`;
    
    // 4. Redireciona o usuário
    window.open(link, '_blank');
}

// ####################################
// INICIALIZAÇÃO: ESCUTA DE EVENTOS
// ####################################

// Adiciona um listener a cada checkbox para recalcular o orçamento ao ser clicado
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', calcularOrcamento);
});

// Adiciona o listener ao botão de Finalizar
finalizarBotao.addEventListener('click', gerarLinkWhatsApp);

// Garante que o orçamento inicial seja R$ 0,00
calcularOrcamento();