var calculateTotal = function(ele){
	var price = parseFloat($(ele).find('.Price input').val());
	var quantity = parseFloat($(ele).find('.Quantity input').val());

	var total = price * quantity;
	$(ele).children('.Total').html(total);

	return total;

};

var sum = function(acc, x){
	return acc + x;
};

var updateSubTotal = function (){
   var TotalValues = [];

    $('tbody tr').each(function (i, ele) {
    var total = calculateTotal(ele);
    TotalValues.push(total);   
  });   
}

var updateTotal = function () {
	var TotalValues = [];

    $('tbody tr').each(function (i, ele) {
    var total = calculateTotal(ele);
    TotalValues.push(total);
    
  });
    var TotalPrice = TotalValues.reduce(sum);
    $('#TotalPrice').html(TotalPrice);
}


$(document).ready(function () {

	$('.btn.cancel').on('click', function (event) {
    	$(this).closest('tr').remove();
         updateTotal();
  });


	$('.btn.calculate').on('click', function (event) {
	  updateTotal();
	});


	$('tr input').on('input', function() {
  	updateSubTotal();
  });


  $('#addItem').on('submit', function(event){
  		event.preventDefault();
  		var item = $(this).children('[name=item]').val();
    	var Price = $(this).children('[name=Price]').val();
    	var Quantity = $(this).children('[name=Quantity]').val();

    	$('tbody').append('<tr>' + '<td class="item">' + item + '</td>' + 
      '<td class="Price"><input type="number" value"' + Price + '"/></td>' +
       '<td class="Quantity">QTY<input type = "number" value"' + Quantity + '" /><button class="btn btn-light btn-sm remove">cancel</button></td>'+
       +'</tr>' + '<td class="Total"></td>' +'</tr>'
       );

  });

  updateTotal();
  	  $(this).children('[name=item]').val('');
      $(this).children('[name=Price]').val('');
      $(this).children('[name=Quantity]').val('');

});

$(document).on('click', '.btn.remove', function(event){
  $(this).closest('tr').remove();
  updateTotal();
});

$('tr input').on('input', function() {
  	updateSubTotal();
  });

var timeout;
$(document).on('input', 'tr input', function(){
  clearTimeout(timeout);
  timeout = setTimeout(function(){
    updatePortfolioValueAndProfit();
  }, 1000);
});


