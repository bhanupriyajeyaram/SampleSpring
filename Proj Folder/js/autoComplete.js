
window.AutoCompleteSearch = {
 searchIndex : function(textBoxId,divId,templateType) 
		 {
	 $(document).keydown(function(e) {
		   if (e.keyCode == 9)
			   $('#'+divId).hide();
		});
	 
	 $(document).click(function(e) {
		   if (e.target.id != textBoxId)
			   $('#'+divId).hide();
		});

	 $("#"+textBoxId).keyup( function (e)
		     {
		    	 
		    	 
		    	 if(e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13 && e.keyCode != 27){
		         var txtlen = $("#"+textBoxId).val().length;
		         var template=$('#'+templateType).val();
		         if(template==0){
		        	 openMessagePopupDialog("Please select template before type the indices");
		        	 $('#'+textBoxId).val('');
		        	 return;
		         }
		             if(txtlen  >= 3)
		             {
		                 $('#'+divId).show();
		                 $.ajax({
		                         type: "GET",
		                         url: "getIndexes.htm?template="+template,
		                         data: "index="+ $("#"+textBoxId).val(),
		                        
		                         success: function (data){ 
		                             $('#'+divId).empty();
		                             $("#"+divId).css("height","");
		                             AutoCompleteSearch.getIndex(data,textBoxId,divId);
		                         },
		                         error: function (result){
		                         }
		                     });
		            }
		            else
		            {
		            $('#'+divId).hide();
		            }
		    	 }
		     });
		 },
searchAllIndex : function(textBoxId,divId,templateType) 
		 {
			 $(document).keydown(function(e) {
				   if (e.keyCode == 9)
					   $('#'+divId).hide();
				});
			 $(document).click(function(e) {
				   if (e.target.id != textBoxId)
					   $('#'+divId).hide();
				});
			 $("#"+textBoxId).keyup( function (e)
		     {   
				 if(e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13 && e.keyCode != 27){
		    	 var txtlen = $("#"+textBoxId).val().length;
	             if(txtlen  >= 3){
		    	 $(".loadingImage").css("display","block");
		                 $('#'+divId).show();
		                 $.ajax({
		                         type: "GET",
		                         url: "getIndexes.htm?template="+templateType,
		                         data: "index="+ $("#"+textBoxId).val(),
		                        
		                         success: function (data){  
		                             $('#'+divId).empty();
		                             AutoCompleteSearch.getIndexList(data,textBoxId,divId);
		                         },
		                         error: function (result){
		                         }
		                     });
	             }else{
	            	 $('#'+divId).empty();
	             }
				 }
		     });
		 
		 },
searchAllIndexGiventext : function(textBoxId,divId) 
		 {
			 $(document).keydown(function(e) {
				   if (e.keyCode == 9)
					   $('#'+divId).hide();
				});	 
			 $(document).click(function(e) {
				   if (e.target.id != textBoxId)
					   $('#'+divId).hide();
				});
			 $("#"+textBoxId).keyup( function (e)
		     {   
				 if(e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13 && e.keyCode != 27){
				 var txtlen = $("#"+textBoxId).val().length;
	             if(txtlen  >= 3){
		    	 $(".loadingImage").css("display","block");
		                 $('#'+divId).show();
		                 $.ajax({
		                         type: "GET",
		                         url: "searchAllIndexGiventext.htm",
		                         data: "searchTxt="+ $("#"+textBoxId).val(),
		                        
		                         success: function (data){  
		                             $('#'+divId).empty();
		                             AutoCompleteSearch.getIndex(data,textBoxId,divId);
		                         },
		                         error: function (result){
		                         }
		                     });
	             }else{
	            	 $('#'+divId).empty(); 
	             }
				 }
		     });
		 
		 },	
searchCategoryGiventext : function(textBoxId,divId){
			 
			 $(document).keydown(function(e) {
				   if (e.keyCode == 9)
					   $('#'+divId).hide();
				});
			 $(document).click(function(e) {
				   if (e.target.id != textBoxId)
					   $('#'+divId).hide();
				});
			 $("#"+textBoxId).keyup( function (e)
		     {   
				
				 if(e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13 && e.keyCode != 27){
		    	 var txtlen = $("#"+textBoxId).val().length;
	             if(txtlen  >= 3){
		    	 $(".loadingImage").css("display","block");
		                 $('#'+divId).show();
		                 $.ajax({
		                         type: "GET",
		                         url: "searchCategoryGiventext.htm",
		                         data: "searchTxt="+ $("#"+textBoxId).val(),
		                        
		                         success: function (data){  
		                             $('#'+divId).empty();
		                             AutoCompleteSearch.getCategory(data,textBoxId,divId);
		                         },
		                         error: function (result){
		                         }
		                     });
	             }else{
	            	 $('#'+divId).empty(); 
	             }
				 }
		     });
		 
		 },
getIndexList: function(data,textBoxId,divId){
				 var jsonData = JSON.parse(data);
			     var table = $('<table id="indexSection"></table>');
			     var index=0;
			     var row=0;
			     for (var i = 0; i < jsonData.length; i++) 
			     {
			    	 if(index==i){
			         row = $('<tr></tr>');
			         index=index+3;
			    	 }
			         var col1 = $('<td></td>');   
			         var box1=$('<input type="checkbox">').val(jsonData[i].Symbol);
			         var col2 = $('<td></td>').text(jsonData[i].Symbol +" "+jsonData[i].Indices);
			         box1.append(jsonData[i].Symbol +" "+jsonData[i].Indices);
			         col1.append(box1);
			         row.append(col1);
			         row.append(col2);
			         table.append(row);                
			     }
			     $("#"+divId).append(table);
			    	 $(".loadingImage").css("display","none");

			 },
getCategory: function(data,textBoxId,divId){
				 var jsonData = JSON.parse(data);
			     var table = $('<table></table>');
			     if(jsonData.length>0){
			     for (var i = 0; i < jsonData.length; i++) 
			     {

			         var row = $('<tr></tr>');
			         var col1 = $('<td style="padding: 2%;color:#2793c1"></td>').text(jsonData[i]);
			         /*var col2 = $('<td style="padding: 2%;"></td>').text(" - ");
			         var col3 = $('<td style="padding-left: 8%"></td>').text(jsonData[i].Indices);   */
			         row.append(col1);
			         /*row.append(col2);
			         row.append(col3);*/
			         table.append(row);                
			     }		    	
			    }else{
			    	 var row = $('<tr></tr>');
			         var col1 = $('<td style="padding: 2% 2% 2% 25%;color:#2793c1" nowarp></td>').text("No category found");	   
			         row.append(col1);
			         table.append(row);   
			    }
			     $("#"+divId).append(table);
			    // if($("#"+divId).height()>600){  		   
			    	 $("#"+divId).css("overflow","auto");
			    	 $("#"+divId).css("height","65");
			  	//   }
			     AutoCompleteSearch.indexHighlights(textBoxId,divId);
			     AutoCompleteSearch.mouseOver(textBoxId,divId);
			     AutoCompleteSearch.categoryClick(textBoxId,divId);
			 },	 
		getIndex: function(data,textBoxId,divId){
			 var jsonData = JSON.parse(data);
		     var table = $('<table></table>');
		     if(jsonData.length>0){
		     for (var i = 0; i < jsonData.length; i++) 
		     {

		         var row = $('<tr></tr>');
		         var col1 = $('<td style="padding: 2%;color:#2793c1"></td>').text(jsonData[i].Symbol);
		         var col2 = $('<td style="padding: 2%;"></td>').text(" - ");
		         var col3 = $('<td style="padding-left: 8%"></td>').text(jsonData[i].Indices);   
		         row.append(col1);
		         row.append(col2);
		         row.append(col3);
		         table.append(row);                
		     }		    	
		    }else{
		    	 var row = $('<tr></tr>');
		         var col1 = $('<td style="padding: 2% 2% 2% 25%;color:#2793c1" nowarp></td>').text("No indices found");	   
		         row.append(col1);
		         table.append(row);   
		    }
		     $("#"+divId).append(table);
		     if($("#"+divId).height()>600){  		   
		    	 $("#"+divId).css("height","100");
		    	 $("#"+divId).css("overflow-y","auto");
		    	 
		  	   }
		     AutoCompleteSearch.indexHighlights(textBoxId,divId);
		     AutoCompleteSearch.mouseOver(textBoxId,divId);
		     AutoCompleteSearch.indexClick(textBoxId,divId);
		    // AutoCompleteSearch.indexHoverDown(textBoxId,divId);
		 },
		 
/** added for Symbol name only starts here */
		 searchSymbolGiventext : function(textBoxId,divId) 
		 {
			 $(document).keydown(function(e) {
				   if (e.keyCode == 9)
					   $('#'+divId).hide();
				});	
			 $(document).click(function(e) {
				   if (e.target.id != textBoxId)
					   $('#'+divId).hide();
				});
			 $("#"+textBoxId).keyup( function (e)
		     {   
				 if(e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13 && e.keyCode != 27){
				 var txtlen = $("#"+textBoxId).val().length;
	             if(txtlen  >= 3){
		    	 $(".loadingImage").css("display","block");
		                 $('#'+divId).show();
		                 $.ajax({
		                         type: "GET",
		                         url: "searchSymbolGiventext.htm",
		                         data: "searchTxt="+ $("#"+textBoxId).val(),
		                        
		                         success: function (data){  
		                             $('#'+divId).empty();
		                             AutoCompleteSearch.getSymbolNames(data,textBoxId,divId);
		                         },
		                         error: function (result){
		                         }
		                     });
	             }else{
	            	 $('#'+divId).empty(); 
	             }
				 }
		     });
		 
		 },
		 getSymbolNames: function(data,textBoxId,divId){
			 var jsonData = JSON.parse(data);
		     var table = $('<table></table>');
		     if(jsonData.length>0){
		     for (var i = 0; i < jsonData.length; i++) 
		     {

		         var row = $('<tr></tr>');
		         var col1 = $('<td style="padding: 2%;color:#2793c1"></td>').text(jsonData[i]);
		         /*var col2 = $('<td style="padding: 2%;"></td>').text(" - ");
		         var col3 = $('<td style="padding-left: 8%"></td>').text(jsonData[i].Indices);   */
		         row.append(col1);
		         /*row.append(col2);
		         row.append(col3);*/
		         table.append(row);                
		     }		    	
		    }else{
		    	 var row = $('<tr></tr>');
		         var col1 = $('<td style="padding: 2% 2% 2% 25%;color:#2793c1" nowarp></td>').text("No symbol name found");	   
		         row.append(col1);
		         table.append(row);   
		    }
		     $("#"+divId).append(table);
		    // if($("#"+divId).height()>600){  		   
		    	 $("#"+divId).css("overflow","auto");
		    	 $("#"+divId).css("height","60");
		  	  // }
		     AutoCompleteSearch.indexHighlights(textBoxId,divId);
		     AutoCompleteSearch.mouseOver(textBoxId,divId);
		     AutoCompleteSearch.SymbolNamesClick(textBoxId,divId);
		 },			 
		 /** added for Symbol name only*/
		 /** added for Currency  name only starts here */
		 searchCurrencyGiventext : function(textBoxId,divId) 
		 {
			 $(document).keydown(function(e) {
				   if (e.keyCode == 9)
					   $('#'+divId).hide();
				});	
			 $(document).click(function(e) {
				   if (e.target.id != textBoxId)
					   $('#'+divId).hide();
				});
			 $("#"+textBoxId).keyup( function (e)
		     {   
				 if(e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13 && e.keyCode != 27){
		    	 var txtlen = $("#"+textBoxId).val().length;
	             if(txtlen  >= 3){
		    	 $(".loadingImage").css("display","block");
		                 $('#'+divId).show();
		                 $.ajax({
		                         type: "GET",
		                         url: "searchCurrencyGiventext.htm",
		                         data: "searchTxt="+ $("#"+textBoxId).val(),
		                        
		                         success: function (data){  
		                             $('#'+divId).empty();
		                             AutoCompleteSearch.getCurrencyType(data,textBoxId,divId);
		                         },
		                         error: function (result){
		                         }
		                     });
	             }else{
	            	 $('#'+divId).empty(); 
	             }
				 }
		     });
		 
		 },
		 getCurrencyType: function(data,textBoxId,divId){
			 var jsonData = JSON.parse(data);
		     var table = $('<table></table>');
		     if(jsonData.length>0){
		     for (var i = 0; i < jsonData.length; i++) 
		     {

		         var row = $('<tr></tr>');
		         var col1 = $('<td style="padding: 2%;color:#2793c1"></td>').text(jsonData[i]);
		         /*var col2 = $('<td style="padding: 2%;"></td>').text(" - ");
		         var col3 = $('<td style="padding-left: 8%"></td>').text(jsonData[i].Indices);   */
		         row.append(col1);
		         /*row.append(col2);
		         row.append(col3);*/
		         table.append(row);                
		     }		    	
		    }else{
		    	 var row = $('<tr></tr>');
		         var col1 = $('<td style="padding: 2% 2% 2% 25%;color:#2793c1" nowarp></td>').text("No currency found");	   
		         row.append(col1);
		         table.append(row);   
		    }
		     $("#"+divId).append(table);
		     //if($("#"+divId).height()>600){  		   
		    	 $("#"+divId).css("overflow","auto");
		    	 $("#"+divId).css("height","55");
		  	   //}
		     AutoCompleteSearch.indexHighlights(textBoxId,divId);
		     AutoCompleteSearch.mouseOver(textBoxId,divId);
		     AutoCompleteSearch.CurrencyTypeClick(textBoxId,divId);		    
		 },			 
/** added for Currency name only*/		 
/** added for Benchmark  name only starts here */
		 searchBenchmarkGiventext : function(textBoxId,divId) 
		 {
			 $(document).keydown(function(e) {
				   if (e.keyCode == 9)
					   $('#'+divId).hide();
				});		
			 $(document).click(function(e) {
				   if (e.target.id != textBoxId)
					   $('#'+divId).hide();
				});
			 $("#"+textBoxId).keyup( function (e)
		     {   
				 if(e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13 && e.keyCode != 27){
		    	 var txtlen = $("#"+textBoxId).val().length;
	             if(txtlen  >= 3){
		    	 $(".loadingImage").css("display","block");
		                 $('#'+divId).show();
		                 $.ajax({
		                         type: "GET",
		                         url: "searchBenchmarkGiventext.htm",
		                         data: "searchTxt="+ $("#"+textBoxId).val(),
		                        
		                         success: function (data){  
		                             $('#'+divId).empty();
		                             AutoCompleteSearch.getBenchmarkNames(data,textBoxId,divId);
		                         },
		                         error: function (result){
		                         }
		                     });
	             }else{
	            	 $('#'+divId).empty(); 
	             }
				 }
		     });
		 
		 },
		 getBenchmarkNames: function(data,textBoxId,divId){
			 var jsonData = JSON.parse(data);
		     var table = $('<table></table>');
		     if(jsonData.length>0){
		     for (var i = 0; i < jsonData.length; i++) 
		     {
		         var row = $('<tr></tr>');
		         var col1 = $('<td style="padding: 2%;color:#2793c1"></td>').text(jsonData[i]);
		         /*var col2 = $('<td style="padding: 2%;"></td>').text(" - ");
		         var col3 = $('<td style="padding-left: 8%"></td>').text(jsonData[i].Indices);   */
		         row.append(col1);
		         /*row.append(col2);
		         row.append(col3);*/
		         table.append(row);                
		     }		    	
		    }else{
		    	 var row = $('<tr></tr>');
		         var col1 = $('<td style="padding: 2% 2% 2% 25%;color:#2793c1" nowarp></td>').text("No benchmark name");	   
		         row.append(col1);
		         table.append(row);   
		    }
		     $("#"+divId).append(table);
		     //if($("#"+divId).height()>600){  		   
		    	 $("#"+divId).css("overflow","auto");
		    	 $("#"+divId).css("height","60");
		  	  // }
		     AutoCompleteSearch.indexHighlights(textBoxId,divId);
		     AutoCompleteSearch.mouseOver(textBoxId,divId);
		     AutoCompleteSearch.benchMarkClick(textBoxId,divId);
		 },			 
		 /** added for Benchmark name only*/	 
		 
		 
		 
		 mouseOver:function(textBoxId,divId) 
		 {
		     $('#'+divId+' table tbody tr').mouseover(function () 
		     {
		    	 $('#'+divId+' table tbody tr').removeClass("selected");
		         $(this).addClass("highlightIndex");
		     }).mouseout(function () 
		     {
		         $(this).removeClass('highlightIndex');
		     });
		 },
		 
		 indexClick:function(textBoxId,divId) 
		 {
		     $('#'+divId+' table tbody tr').click(function () 
		     {
		         var Exchange = $(this).closest('tr').find('td:eq(0)').text();
		         if(Exchange!="No indices found"){
		         $("#"+textBoxId).val(Exchange);
		         $('#'+divId).hide();
		         }else{
		        	 $('#'+divId).hide();
		         }	   	       
		     });
		     
		     
		 },
		 benchMarkClick:function(textBoxId,divId) 
			 {
			     $('#'+divId+' table tbody tr').click(function () 
			     {
			         var Exchange = $(this).closest('tr').find('td:eq(0)').text();
			         if(Exchange!="No benchmark name"){
			         $("#"+textBoxId).val(Exchange);
			         $('#'+divId).hide();
			         }else{
			        	 $('#'+divId).hide();
			         }	   	       
			     });
			     
			     
			 },
//CurrencyTypeClick//No currency found			 
			 CurrencyTypeClick:function(textBoxId,divId) 
			 {
			     $('#'+divId+' table tbody tr').click(function () 
			     {
			         var Exchange = $(this).closest('tr').find('td:eq(0)').text();
			         if(Exchange!="No currency found"){
			         $("#"+textBoxId).val(Exchange);
			         $('#'+divId).hide();
			         }else{
			        	 $('#'+divId).hide();
			         }	   	       
			     });
			     
			     
			 },			 
//SymbolNamesClick//No symbol name found			 
			 SymbolNamesClick:function(textBoxId,divId) 
			 {
			     $('#'+divId+' table tbody tr').click(function () 
			     {
			         var Exchange = $(this).closest('tr').find('td:eq(0)').text();
			         if(Exchange!="No symbol name found"){
			         $("#"+textBoxId).val(Exchange);
			         $('#'+divId).hide();
			         }else{
			        	 $('#'+divId).hide();
			         }	   	       
			     });
			     
			     
			 },	
//categoryClick//No category found			 
			 categoryClick:function(textBoxId,divId) 
			 {
			     $('#'+divId+' table tbody tr').click(function () 
			     {
			         var Exchange = $(this).closest('tr').find('td:eq(0)').text();
			         if(Exchange!="No category found"){
			        	 $("#"+textBoxId).val(Exchange);
			         	$('#'+divId).hide();
			         }else{
			        	 $('#'+divId).hide();
			         }	       
			     });
			     
			     
			 },	 
			 
		 indexHighlights: function(textBoxId,divId)
		 {
		     $('#'+divId+' table tbody').each(function()
		     {
		         $('tr:odd',  this).addClass('odd');   
		         $('tr:even',  this).addClass('even'); 
		       //  $('tr',  this).find('td:eq(0)').hide();
		     });
		 },
		 hoverDown:function(e){
			    var curr_tr = $('#'+e.data.param2+' table tbody').find('tr.selected').first();
			    switch (e.keyCode) {
			    case 40://down
			        if (curr_tr.length == 0) {
			            curr_tr = $('#'+e.data.param2+' table tbody').find('tr').first();
			        } else {
			            curr_tr.removeClass("selected");
			            curr_tr = curr_tr.next("tr");
			        }
			        var Exchange = curr_tr.closest('tr').find('td:eq(0)').text();
			        if(Exchange!="No indices found"){
			        	if(Exchange!="No category found"){
			        		if(Exchange!="No symbol name found"){
			        			if(Exchange!="No currency found"){
			        				if(Exchange!="No benchmark name"){
						        		$("#"+e.data.param1).val(Exchange);						        		
						        	}			        				
					        	}			        			
				        	}			        		
			        	}			        	
			        }			        
			        curr_tr.addClass("selected");
			        $('#'+e.data.param2+' table tbody tr').removeClass('highlightIndex');
			        break;
			    case 38://up
			        if (curr_tr.length == 0) {
			            curr_tr = $('#'+e.data.param2+' tbody').find('tr').last();
			        } else {
			            curr_tr.removeClass("selected");
			            curr_tr = curr_tr.prev("tr");
			        }
			        var Exchange = curr_tr.closest('tr').find('td:eq(0)').text();
			        if(Exchange!="No indices found"){
			        	if(Exchange!="No category found"){
			        		if(Exchange!="No symbol name found"){
			        			if(Exchange!="No currency found"){
			        				if(Exchange!="No benchmark name"){
						        		$("#"+e.data.param1).val(Exchange);
						        	}
					        	}
				        	}
			        	}
			        }				        			        
			        curr_tr.addClass("selected");
			        $('#'+e.data.param2+' table tbody tr').removeClass('highlightIndex');
			        break;
			    case 13://enter
			        	 $('#'+e.data.param2).hide();
			        	 break;
			    case 27://down
			    	 $('#'+e.data.param2).hide();
			    	 $('#'+e.data.param2+' table tbody tr').removeClass('highlightIndex');
			    	 break;
			    default:
					break;
			    }
			},
			/*indexHoverDown:function(e){
				    var curr_tr = $('#'+e.data.param2+' table tbody').find('tr.selected').first();
				    alert(curr_tr);
				    switch (e.keyCode) {
				    case 40://down
				        if (curr_tr.length == 0) {
				            curr_tr = $('#'+e.data.param2+' table tbody').find('tr').first();
				            alert(curr_tr);
				        } else {
				            curr_tr.removeClass("selected");
				            curr_tr = curr_tr.next("tr");
				        }
				        var Exchange = curr_tr.closest('tr').find('td:eq(0)').text();
				        alert(Exchange);
				        if(Exchange!="No category found"){
				        	alert(Exchange);
				        	$("#"+e.data.param1).val(Exchange);
				        }			        
				        curr_tr.addClass("selected");
				        $('#'+e.data.param2+' table tbody tr').removeClass('highlightIndex');
				        break;
				    case 38://up
				        if (curr_tr.length == 0) {
				            curr_tr = $('#'+e.data.param2+' tbody').find('tr').last();
				            alert(curr_tr);
				        } else {
				            curr_tr.removeClass("selected");
				            curr_tr = curr_tr.prev("tr");
				        }
				        var Exchange = curr_tr.closest('tr').find('td:eq(0)').text();
				        alert(Exchange);
				        if(Exchange != "No category found"){
				        	alert(Exchange);
				        	$("#"+e.data.param1).val(Exchange);
				        }			        
				        curr_tr.addClass("selected");
				        $('#'+e.data.param2+' table tbody tr').removeClass('highlightIndex');
				        break;
				    case 13://enter
				        	 $('#'+e.data.param2).hide();
				        	 break;
				    case 27://down
				    	 $('#'+e.data.param2).hide();
				    	 $('#'+e.data.param2+' table tbody tr').removeClass('highlightIndex');
				    	 break;
				    default:
						break;
				    }
				}*/
};
