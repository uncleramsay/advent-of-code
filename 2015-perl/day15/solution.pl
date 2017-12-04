use strict;
use warnings;
use Data::Dumper;

my @aLines = ();
open(my $fh, '<', 'input.txt');
while(defined(my $sLine = <$fh>)) {
  chomp($sLine);
  push(@aLines, $sLine);
}
close($fh);

my @aIngredients = ();

sub one {
  return iterate();
}

sub two {
  return iterate(1);
}

sub parse {
  foreach my $sLine (@aLines) {
    my ($sIngredient, $sCapacity, $sDurability, $sFlavour, $sTexture, $sCalories) = $sLine =~ /^(\w+): capacity (.+), durability (.+), flavor (.+), texture (.+), calories (.+)$/;
    push(@aIngredients, {
      'name' => $sIngredient,
      'capacity' => $sCapacity,
      'durability' => $sDurability,
      'flavour' => $sFlavour,
      'texture' => $sTexture,
      'calories' => $sCalories
    });
  }
}

sub calculateScore {
  my @aAmounts = @{shift @_};
  my $sCaresAboutCalories = shift @_;

  my %hScores = (
    'capacity' => 0,
    'durability' => 0,
    'flavour' => 0,
    'texture' => 0,
    'calories' => 0
  );

  for (my $i = 0; $i < scalar(@aIngredients); $i++) {
    my %hIngredient = %{$aIngredients[$i]};
    my $sAmount = $aAmounts[$i];

    $hScores{'capacity'} += ($sAmount * $hIngredient{'capacity'});
    $hScores{'durability'} += ($sAmount * $hIngredient{'durability'});
    $hScores{'flavour'} += ($sAmount * $hIngredient{'flavour'});
    $hScores{'texture'} += ($sAmount * $hIngredient{'texture'});
    $hScores{'calories'} += ($sAmount * $hIngredient{'calories'});
  }

  foreach my $sType (keys %hScores) {
    if ($hScores{$sType} < 0) {
      $hScores{$sType} = 0;
    }
  }

  if ($sCaresAboutCalories && $hScores{'calories'} != 500) {
    return 0;
  }

  return ($hScores{'capacity'} * $hScores{'durability'} * $hScores{'flavour'} * $hScores{'texture'});
}

sub iterate {
  my $sCaresAboutCalories = shift @_;

  my $sHighestScore = 0;

  for (my $i = 0; $i <= 100; $i++) {
    my $iRemaining = 100 - $i;

    for (my $j = 0; $j < $iRemaining; $j++) {
      my $jRemaining = $iRemaining - $j;

      for (my $k = 0; $k < $jRemaining; $k++) {
        my $kRemaining = $jRemaining - $k;

        my $sScore = calculateScore([$i, $j, $k, $kRemaining], $sCaresAboutCalories);
        if ($sScore > $sHighestScore) {
          $sHighestScore = $sScore;
        }
      }
    }
  }

  return $sHighestScore;
}

parse();
print "Solution one is: " . one() . "\n";
print "Solution two is: " . two() . "\n";
