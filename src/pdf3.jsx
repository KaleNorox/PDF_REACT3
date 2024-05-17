import { jsPDF } from "jspdf";
import React from 'react';
import JsBarcode from 'jsbarcode';

function pdf() {
    var dia = new Date();
    var d = dia.getDate();
    var m = dia.getMonth();
    var y = dia.getFullYear();
    if (m < 10) m = `0${m}`;
    if (d < 10) d = `0${d}`;
    var v = Math.floor(Math.random() * 9) + 1;
    var u = Math.floor(Math.random() * 9000000) + 1000000;
    var r = Math.floor(Math.random() * 9000) + 1000;
    var t = Math.floor(Math.random() * 900000000) + 100000000;
    const empresa = {
        emp: 'Transportes Mr Logistik S.A.C',
        env: `CRISTIAN JOSE VEGA ANAYA`,
        fecha: `${d}/${m}/${y}`,
        ubigeo: '080101',
        dep: 'CHACHAPOYAS'
    };

    const cliente = {
        trac: `MR${t}`,
        cli: 'DAVID BERROCAL GUTIERREZ',
        direc: {
            p1: 'Av.Primavera MZA. H Lote . 106d AV.los Gramadales AV.Primavera MZa. h Lote.',
            p2: ' 106d A.V .los Gramadales'
        },
        docExt: `E00-${r}`,
        dep: 'CHACHAPOYAS-CHACHAPOYAS-CHACHAPOYAS'
    }


    const sticker = () => {
        const doc = new jsPDF({
            unit: 'cm',
            format: [10, 7.5],
            orientation: 'landscape'
        });
        const canvas = document.createElement('canvas');
        JsBarcode(canvas, cliente.docExt, {
            format: "CODE128",
            displayValue: false,
            fontSize: 12,
            margin: 10
        });
        const barcodeImage = canvas.toDataURL('image/png');
        //empresa
        doc.setFontSize(12);
        doc.setTextColor(28, 65, 124);
        doc.text(`${empresa.dep}`, 5, 0.7);
        doc.text(`TRACKING:${cliente.trac}`, 1.1, 2.7);
        doc.text(`(${v}/${v})`, 7, 2.7);
        doc.setFontSize(6);
        doc.setTextColor(28, 65, 124);
        doc.text(`${empresa.emp}`, 0.5, 0.5);
        doc.text(`ENVIA: ${empresa.env}`, 0.5, 1);
        doc.text(`${empresa.fecha}`, 3.5, 0.5);
        doc.text(`(ubigeo)`, 8.7, 0.5);
        doc.text(`${u}`, 8.7, 0.8);
        
        //barra en pdf
        doc.addImage(barcodeImage, 'PNG', 1.55, 1.1, 7, 1.2);
        //cliente
        doc.text(`RECIBE:${cliente.cli}`, 0.5, 3.1);
        doc.text(`DIRECCION:${cliente.direc.p1} `, 0.5, 3.4);
        doc.text(`${cliente.direc.p2} `, 0.45, 3.7);
        doc.text(`${cliente.docExt}`, 0.5, 4.0);
        doc.text(`${cliente.dep}`, 0.5, 4.3);
        //cuadrados letras
        doc.text('NOMBRES:', 0.5, 4.8);
        doc.text('TITULAR',0.9, 6.425);
        doc.text('EMPLEADO',0.9, 7.025);
        doc.text('FAMILIAR',2.9, 6.425);
        doc.text('VIGILANTE',2.9, 7.025);
        doc.text('D.I:',0.5, 5.8);
        doc.text('FEC:_ _ _/_ _ _/ _ _ _',4.5, 6.425);
        doc.text('HOR:_ _ _ _ : _ _ _ _',4.5, 7.025);
        doc.text('Firma Y/O SELLO',7.6, 7.025);

        //cuadrados
        doc.setDrawColor(28, 65, 124);
        doc.setLineWidth(0.02);
        doc.rect(0.5, 6.2, 0.3, 0.3);
        doc.rect(0.5, 6.8, 0.3, 0.3);
        //familiar y vigilante
        doc.rect(2.5, 6.2, 0.3, 0.3);
        doc.rect(2.5, 6.8,0.3, 0.3);
        //lineas
        doc.setLineWidth(0.01);
        doc.setLineDash([0.25]);
        //nombre
        doc.line(1.7, 4.8, 7,4.8);
        //linea sola
        doc.line(0.5, 5.2, 7,5.2 );
        //linea d.i
        doc.line(0.9, 5.8, 3,5.8 );
        //firma
        doc.setLineDash([0.1]);
        doc.line(7, 6.7, 9.8,6.7 );


        doc.save(`reporte_${empresa.dep}_${r}`)

        doc.output('dataurlnewwindow');
    }

    return (

        <body>
            <center>
                <button onClick={sticker}> Reporte</button>
            </center>
        </body>

    )


}
export default pdf;