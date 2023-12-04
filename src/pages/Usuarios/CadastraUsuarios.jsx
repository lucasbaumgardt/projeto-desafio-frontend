import React, { useState, useEffect } from "react";

function CadastraUsuarios() {
    return (
        <div>
        <table className="w-[80%] border-green-500 border-2 mx-auto my-auto mt-24">
            <thead className="bg-green-500 text-white">
            <tr>
                <th className="w-44 border-green-500 border-b-2 p-2 text-center">Nome Completo</th>
                <th className="w-32 border-green-500 border-b-2 p-2 text-center">CPF</th>
                <th className="w-32 border-green-500 border-b-2 p-2 text-center">Admin</th>
            </tr>
            </thead>

            <tbody>
          
                <tr >
                    <td className="w-44 border-green-500 border-b-2 p-2 text-center"></td>
                    <td className="w-32 border-green-500 border-b-2 p-2 text-center"></td>
                    <td className="w-32 border-green-500 border-b-2 p-2 text-center"></td>
                </tr>
            
            </tbody>
        </table>
        </div>
    );
}

export default CadastraUsuarios;
