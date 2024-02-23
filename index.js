const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Rota de calculo do valor das parcelas e juros
app.post('/calcularParcelas', (req, res) => {
    try {
        const { valor, parcelas } = req.body;

        if (!valor || !parcelas) {
            throw new Error('É necessário fornecer valor e parcelas.');
        }

        const valorFloat = parseFloat(valor);
        const parcelasInt = parseInt(parcelas);

        if (isNaN(valorFloat) || isNaN(parcelasInt)) {
            throw new Error('Valor e parcelas devem ser números válidos.');
        }

        // Acrescentando 5% ao valor total
        const valorTotal = valorFloat * 1.05;

        // Calculando o valor de cada parcela
        const valorParcela = valorTotal / parcelasInt;

        res.json({
            valorTotal: valorTotal,
            parcelas: parcelasInt,
            valorParcela: valorParcela
        });
    } catch (error) {
        console.error('Erro ao calcular as parcelas:', error.message);
        res.status(400).json({ error: error.message });
    }
});

// Iniciando servidor
app.listen(port, () => {
    console.log(`Servidor funcionando na porta ${port}`);
});