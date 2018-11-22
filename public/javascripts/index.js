let image_index = 1;
showSlice(1);

function nextSlice(offset)
{
    image_index += offset;
    showSlice(image_index);
}

function showSlice(n) {
    let i;
    const slices = document.getElementsByClassName("slice");
    if (n > slices.length)
    {
        image_index = 1;
    }

    if (n < 1)
    {
        image_index = slices.length;
    }

    for (i = 0; i<slices.length;i++)
    {
        slices[i].style.display = "none";
    }

    $("#fade"+image_index.toString()).fadeIn(900);
    slices[image_index-1].style.display = "block";
}