/**
 *Script : gjcalendar.js v.1.5
 *
 *Purpose : Create a calendar for implements
 *
 *Date Created : 20-02-2012
 *Author : Fabio Elisio
 */

(function ($) {

    $.gjcalendar = {

         /**
         * @description Plugin create a calendar on the screen based on the id of the div past
         * @example $.calendar.viewCalendar("idDiv");
         * @param idDiv - id for the div
         */
        
        viewCalendar: function (idDiv) {
            $(document.createElement("div")).attr({ id: "calendario" }).prependTo("#" + idDiv);
            $(document.createElement("div")).attr({ id: "calendarioControlView" }).prependTo("#" + idDiv);

            var div = "";
            div += "<div id='recuarCalendarView'> ◄ </div>";
            div += "<h1><label id='mesControl'></label> &nbsp;de <label id='anoControl'></label></h1>";
            div += "<div class='hoje'><button id='todayDay' type='button'>Hoje</button></div>";
            div += "<div id='avancarCalendarView'> ► </div>";
            $("#calendarioControlView").html(div);

            function qntDiaDoMes(mes, ano) {
                var bissexto;
                if ((ano % 4) == 0 && (ano % 100) != 0 || (ano % 400) == 0) {
                    bissexto = 29;
                } else {
                    bissexto = 28;
                }
                var meses = new Array(31, bissexto, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
                var qnt = meses[mes];
                return qnt;
            }

            function primeiroDiaMes(ano, mes) {
                var dCalDate = new Date(ano, mes, 1);
                var primeiroDia = dCalDate.getDay();
                return primeiroDia;
            }

            function imprimiMes(mes) {
                var retorno = "";

                switch (mes) {
                    case 0:
                        retorno = "Janeiro";
                        break
                    case 1:
                        retorno = "Fevereiro";
                        break
                    case 2:
                        retorno = "Mar&ccedil;o";
                        break
                    case 3:
                        retorno = "Abril";
                        break
                    case 4:
                        retorno = "Maio";
                        break
                    case 5:
                        retorno = "Junho";
                        break
                    case 6:
                        retorno = "Julho";
                        break
                    case 7:
                        retorno = "Agosto";
                        break
                    case 8:
                        retorno = "Setembro";
                        break
                    case 9:
                        retorno = "Outubro";
                        break
                    case 10:
                        retorno = "Novembro";
                        break
                    case 11:
                        retorno = "Dezembro";
                        break
                    default:
                        retorno = "erro no mes";
                }

                return retorno;
            }

            function getCalendar(maisMes, maisAno) {

                //criando array para o dia do mes
                var diaMes = new Array();
                diaMes[0] = new Array(7);
                diaMes[1] = new Array(7);
                diaMes[2] = new Array(7);
                diaMes[3] = new Array(7);
                diaMes[4] = new Array(7);
                diaMes[5] = new Array(7);
                diaMes[6] = new Array(7);

                diaMes[0][0] = "Dom";
                diaMes[0][1] = "Seg";
                diaMes[0][2] = "Ter";
                diaMes[0][3] = "Qua";
                diaMes[0][4] = "Qui";
                diaMes[0][5] = "Sex";
                diaMes[0][6] = "Sab";


                //pegando o mes passado na função para imprimir o mes e ano atual
                var mesAtual = maisMes;
                var anoInteiro = maisAno;

                //pegando quantidade de dias do mes
                var qntDias = qntDiaDoMes(mesAtual, anoInteiro);
                //pegando o nome do mes
                var mes = imprimiMes(mesAtual);//imprmir o mes
                //pegando primeiro dia do mes
                var primeiroDiaDoMes = primeiroDiaMes(anoInteiro, mesAtual);

                var dataAtual = 1;
                var d, w;



                for (d = primeiroDiaDoMes; d < 7; d++) {
                    diaMes[1][d] = dataAtual;
                    dataAtual++;

                }

                for (w = 2; w < 7; w++) {
                    for (d = 0; d < 7; d++) {
                        if (dataAtual <= qntDias) {
                            diaMes[w][d] = dataAtual;
                            dataAtual++;
                        }
                    }
                }

                var mesInt = parseInt(mesAtual);
                mesInt = mesInt + 1;
                var tab = "";

                tab += "<thead>";
                tab += "<tr id='diasSemana'>";
                tab += "<th id='domingo'>" + diaMes[0][0] + "</th>";
                tab += "<th>" + diaMes[0][1] + "</th>";
                tab += "<th>" + diaMes[0][2] + "</th>";
                tab += "<th>" + diaMes[0][3] + "</th>";
                tab += "<th>" + diaMes[0][4] + "</th>";
                tab += "<th>" + diaMes[0][5] + "</th>";
                tab += "<th id='sabado'>" + diaMes[0][6] + "</th>";
                tab += "</tr>";
                tab += "</thead>";

                for (w = 1; w < 7; w++) {
                    tab += "<tr id='calendario tr'>";
                    for (d = 0; d < 7; d++) {
                        tab += "<td id='calendario td'><div  class='calendarioConteudo'>";

                        if (!isNaN(diaMes[w][d])) {
                            if (diaMes[w][d] < 10) {
                                tab += "<h4>";
                                tab += "0" + diaMes[w][d];
                                tab += "</h4>";
                            } else {
                                tab += "<h4>";
                                tab += diaMes[w][d];
                                tab += "</h4>";
                            }

                        } else {

                            tab += "&nbsp;";
                        }
                        //concatena 0 ao dias do mes
                        var diaMesFinal = "";
                        if (diaMes[w][d] < 10) {
                            diaMesFinal = "0" + diaMes[w][d];
                        } else {
                            diaMesFinal = diaMes[w][d];
                        }
                        //concatena 0 ao mes
                        if (mesInt < 10) {
                            var mesFinal = "0" + mesInt;
                        } else {
                            mesFinal = mesInt;
                        }
                        tab += "<div id=" + anoInteiro + mesFinal + diaMesFinal + " class='printDinamicCalendarView'></div></div></td>";

                    }
                    tab += "</tr>";

                }


                var tableCalendar = $(document.createElement("table"))
                    .attr({ id: "tableCalendarView", cellpadding: "0", cellspacing: "0" })
                    .addClass("ui-accordion-header")
                    .html(tab)
                    .each(function () {
                        //pegando dia de hoje e estilizando

                        var diaHojeFinal = "";
                        var dataDeHoje = new Date();
                        var diaHoje = dataDeHoje.getDate() + "";
                        var mesHoje = dataDeHoje.getMonth() + 1 + "";
                        var anoHoje = dataDeHoje.getFullYear() + "";

                        mesHoje = (mesHoje < 10) ? "0" + mesHoje : mesHoje;

                        if (diaHoje < 10) {
                            diaHojeFinal = anoHoje + mesHoje + "0" + diaHoje;
                        } else {
                            diaHojeFinal = anoHoje + mesHoje + diaHoje;
                        }
                        $(this).children().find("#" + diaHojeFinal).parents('td').css("background", "#FFEFBF");

                    });

                //percorrer para procurar dia de hoje


                $("#calendario").html(tableCalendar);
                $("#mesControl").html(mes);
                $("#anoControl").html(anoInteiro);

            }//end get calendar



            //imprimindo na tela quando abre
            var dataAtual = new Date();
            var mesHoje = dataAtual.getMonth();
            var anoHoje = dataAtual.getFullYear();

            //mandando a data completa do mes
            var passarMes = parseInt(mesHoje);
            passarMes = passarMes + 1;
            if (passarMes < 10) {
                var dataCompleta = anoHoje + "0" + passarMes + "01";
            } else {
                dataCompleta = anoHoje + "" + passarMes + "01";
            }
            //mandando a data completa do mes

            getCalendar(mesHoje, anoHoje);
            var but = "<div><input type='hidden' id='mesAtual' value='" + mesHoje + "'><input type='hidden' id='anoAtual' value='" + anoHoje + "'><input type='hidden' id='dataCompleta' value='" + dataCompleta + "'></div>";
            $("#calendarioControlView").append(but);
            

            $("#avancarCalendarView").click(function () {
                var mesN = parseInt($("#mesAtual").val());
                var anoN = parseInt($("#anoAtual").val());
                var proximoMes = mesN + 1;
                if (proximoMes == 12) {
                    anoN = anoN + 1;
                    proximoMes = 0;
                }
                //mandando a data completa do mes
                var passarMesN = parseInt(proximoMes);
                passarMesN = passarMesN + 1;
                if (passarMesN < 10) {
                    var dataCompletaN = anoN + "0" + passarMesN + "01";
                } else {
                    dataCompletaN = anoN + "" + passarMesN + "01";
                }
                //mandando a data completa do mes
                $("#mesAtual").val(proximoMes);
                $("#anoAtual").val(anoN);
                $("#dataCompleta").val(dataCompletaN);
                getCalendar(proximoMes, anoN);

            });


            $("#recuarCalendarView").click(function () {
                var mesN = parseInt($("#mesAtual").val());
                var anoN = parseInt($("#anoAtual").val());
                var proximoMes = mesN - 1;
                if (proximoMes == -1) {
                    anoN = anoN - 1;
                    proximoMes = 11;
                }
                //mandando a data completa do mes
                var passarMesN = parseInt(proximoMes);
                passarMesN = passarMesN + 1;
                if (passarMesN < 10) {
                    var dataCompletaN = anoN + "0" + passarMesN + "01";
                } else {
                    dataCompletaN = anoN + "" + passarMesN + "01";
                }
                //mandando a data completa do mes

                $("#mesAtual").val(proximoMes);
                $("#anoAtual").val(anoN);
                $("#dataCompleta").val(dataCompletaN);
                getCalendar(proximoMes, anoN);
            });

            $("#todayDay").click(function () {
                var dataAtual = new Date();
                var mesHoje = dataAtual.getMonth();
                var anoHoje = dataAtual.getFullYear();
                //mandando a data completa do mes
                var passarMes = parseInt(mesHoje);
                passarMes = passarMes + 1;
                if (passarMes < 10) {
                    var dataCompleta = anoHoje + "0" + passarMes + "01";
                } else {
                    dataCompleta = anoHoje + "" + passarMes + "01";
                }
                //mandando a data completa do mes

                $("#mesAtual").val(mesHoje);
                $("#anoAtual").val(anoHoje);
                $("#dataCompleta").val(dataCompleta);
                getCalendar(mesHoje, anoHoje);
            });
        }

    };

})(jQuery);

//--------------fim plugin calendarView
//######################################################