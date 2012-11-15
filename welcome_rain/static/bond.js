//alert(1)


(function($){
	$.fn.addChartMutilSelect = function(passedOptions){
		var options = {
			
		};
		if (passedOptions) {
	    	jQuery.extend(options, passedOptions);
	   };
		return this.each(function(){
			function init() {         
		      	console.log('addChartMutilSelect init');       
		      	createClusterSelectList();
			}
			function createClusterSelectList(){
				console.log('createClusterSelectList'); 
				getClusterListFromServer();
				//renderSelectHtml();
				//addEventToClusterHtml();	
			}
			function getClusterListFromServer(){
				console.log('getClusterListFromServer');
				ajax('/static/getClusterList.json',null,getClusterListFromServerCallback);
			}
			function getClusterListFromServerCallback(oResponse){
				console.log('getClusterListFromServerCallback');
				renderClusterHtml(oResponse);
				addEventToClusterHtml();
				createDataSourceList(null);
			}
			function renderClusterHtml(oResponse){
				console.log('renderClusterHtml');
				
				sClusterSelectHtml = getSelectHtml(oResponse.cluster,'cluster_sel');
				
				
				$('#div1').html(sClusterSelectHtml);
				
				
				//console.log(selectHtml)
			}
			function getSelectHtml(oData,sId){
				var selectHtml = '<select id="'+sId+'" name="'+sId+'">';
				for (var index=0; index<oData.length; index++ ){
					selectHtml += "<option value='"+oData[index].name+"'>"+oData[index].name+"</option>";
				} 
				selectHtml += '</select>';
				return selectHtml
			}
			function addEventToClusterHtml(){
				console.log('addEventToClusterHtml');
				$("#cluster_sel").change(function(){
					selectClusterControl('true');
					
					createHostSelectList($(this).val());
					var oArguments = {
						cluster_name : $(this).val()
					}
					createDataSourceList(oArguments);
				});
				$("#chart_form_btn").click(function(){
					console.log('chart_form_btn click');
					console.log($("#check_datasource").val())					//$("#chart_form").submit();
					if ($("#check_datasource").val()=='false'){
						alert('you must choice datasource!!!');
						return false
					}
					$("#chart_form").submit();
				})
			}
			function ajax(sUrl,oData,callback){
				$.ajax({
  					url: sUrl,
  					dataType: 'json',
  					data : oData,
  					success: function(data){
  						callback(data)
  					},
  					error: function (jqXHR, textStatus, errorThrown) {
      				console.log(jqXHR)
      				console.log(textStatus)
      				console.log(errorThrown)
						return false;
      			}
				});
			}
			function createHostSelectList(sClusterName){
				console.log('createHostSelectList');
				var oArguments={
					cluster_name : sClusterName
				}
				//console.log(arguments)
				ajax('/static/getHostList.json',oArguments,getHostListFromServerCallback);
			}
			function getHostListFromServerCallback(oResponse){
				console.log('getHostListFromServerCallback');
				renderHostHtml(oResponse);
				addEventToHostHtml();
			}
			function renderHostHtml(oResponse){
				console.log('renderHostHtml');
				sHostSelectHtml = getSelectHtml(oResponse.host,'host_sel');
				$('#div2').html(sHostSelectHtml);
			}
			function addEventToHostHtml(){
				$("#host_sel").change(function(){
					selectHostControl('true');
					var oArguments ={
						host_name : $(this).val()
					}
					createDataSourceList(oArguments);
				});
			}
			
			function createDataSourceList(sArg){
				console.log('createDataSourceList');
				ajax('/static/getDataSourceList.json',sArg,getDataSourceListFromServerCallback);
			}
			function getDataSourceListFromServerCallback(oResponse){
				console.log('getDataSourceListFromServerCallback');
				renderDataSourceHtml(oResponse);
				addEventToDataSourceHtml();
				
			}
			function renderDataSourceHtml(oResponse){
				console.log('getDataSourceListFromServerCallback');
				console.log(oResponse);
				sDataSourceSelectHtml = getSelectHtml(oResponse.dataSource,'datasource_sel');
				$('#div3').html(sDataSourceSelectHtml);
			}
			function addEventToDataSourceHtml(){
				console.log('addEventToDataSourceHtml');
				selectDataSourceControl('false');
				$("#datasource_sel").change(function(){
					selectDataSourceControl('true');
				});
			}
			function selectClusterControl(sVal){
				$("#check_cluster").val(sVal);
			}
			function selectHostControl(sVal){
				$("#check_host").val(sVal);
			}
			function selectDataSourceControl(sVal){
				$("#check_datasource").val(sVal);
			}
			
			init();
		});
	};
})(jQuery);


$(document).ready(function() {
 // Handler for .ready() called.
	/*$.ajax({
  		url: '/static/getClusterList.json',
  		dataType: 'json',
  		success: function(data){
  			console.log(data);
  			console.log($("#chart_form"));
  		},
  		error: function (jqXHR, textStatus, errorThrown) {
      	console.log(jqXHR)
      	console.log(textStatus)
      	console.log(errorThrown)
      }
	});*/
	$(document).addChartMutilSelect({
	});
});